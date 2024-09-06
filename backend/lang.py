import json
import unicodedata
import arabic_reshaper
from alive_progress import alive_bar



reshaper_config = {
	'delete_harakat': False,  # Keep vowel marks if any
	'support_ligatures': False,  # Don't combine characters into ligatures
	'shift_harakat_position': False,  # Keep harakat (diacritics) in place
	'use_unshaped_instead_of_isolated': False  # Use isolated forms instead of unshaped forms
}
reshaper = arabic_reshaper.ArabicReshaper(configuration=reshaper_config)

def normalize(str):
	normalized_text = unicodedata.normalize('NFD', str)
	filtered_text = ''.join(c for c in normalized_text if not unicodedata.combining(c))
	return filtered_text


def lang_json_to_js(file_path):
	def snake_to_camel(str):
		components = str.split('_')
		return components[0] + ''.join(x.title() for x in components[1:])

	def convert_properties(obj):
		if isinstance(obj, list):
			return [convert_properties(item) for item in obj]
		elif isinstance(obj, dict):
			new_obj = {}
			for k, v in obj.items():
				new_key = snake_to_camel(k)
				new_obj[new_key] = convert_properties(v) if isinstance(v, (dict, list)) else v
			return new_obj
		else:
			return obj

	# Reading JSON file into Python list of dictionaries
	with open(file_path, 'r', encoding='utf-8') as json_file:
		json_list = json.load(json_file)

	# Filtering
	json_list = sorted(json_list, key=lambda k: k['exonym'])
	json_list = list(filter(lambda parent: isinstance(parent.get('editions'), list) and any('word_list' in edition for edition in parent['editions']), json_list))
	exclude_list = ['Lojban', 'Tamil', 'Japanese']
	json_list = [d for d in json_list if d.get('exonym') not in exclude_list]

	# Converting and writing to JS
	camel_array = convert_properties(json_list)
	js_array = 'var languages = ' + json.dumps(camel_array, ensure_ascii=False) + ';'
	with open('js/lang.js', 'w', encoding='utf-8') as js_file:
		js_file.write(js_array)


def word_list_jsonl_to_js(word_list):
	def find_words(data, keyName):
		if isinstance(data, dict):
			for key, value in data.items():
				if key == keyName:
					word_array.append(value)
				find_words(value, keyName)
		elif isinstance(data, list):
			for item in data:
				find_words(item, keyName)

	def extractor_in_context(word_list):
		match word_list:
			case "ipa":  extractor = "ipa"
			case "bopo": extractor = "zh-pron"
			case "pin":  extractor = "zh-pron"
			case _:      extractor = "word"

		return extractor

	def format_word_in_context(word_list, word):
		match word_list:
			case "ara":
				word = reshaper.reshape(word)
			case "heb":
				word = word
			case "ger2":
				word = word.replace('ß', 'ẞ')
				word = word.upper()
			case _:
				word = word.upper()
		
		return word
	
	def uses_valid_letters(alphabet, word):
		i = 0
		while i < len(word):
			if word[i:i+3] in alphabet: i += 3
			elif word[i:i+2] in alphabet: i += 2
			elif word[i] in alphabet: i += 1
			else: return False
		return True

	# Read JSON file into Python list of dictionaries
	with open('lang.json', 'r', encoding='utf-8') as lang_file:
		lang_list = json.load(lang_file)

	# Search for editions that use given word list
	editions = []
	for lang_dict in lang_list:
		for edition in lang_dict['editions']:
			if edition.get('word_list') == word_list:
				editions.append(edition)

	# 
	alphabet = set(editions[0]['alphabet'])
	iso = editions[0]['iso']
	word_array = []
	word_set = set()

	# 
	with open(f'word-lists/jsonl/{iso}.jsonl', 'r', encoding='utf-8') as jsonl_file:
		entry_list = [json.loads(line) for line in jsonl_file]
		extractor = extractor_in_context(word_list)
		find_words(entry_list, extractor)
		for word in word_array:
			word = format_word_in_context(word_list, word)
			if (len(word) >= 2) and (len(word) < 15) and (not ' ' in word):
				if not uses_valid_letters(alphabet, word): word = normalize(word)
				if uses_valid_letters(alphabet, word): word_set.add(word)

	#
	with open(f'word-lists/js/{word_list}.js', 'w', encoding='utf-8') as js_file:
		js_file.write(f'wordLists.{word_list} = {json.dumps(sorted(word_set), ensure_ascii=False)};')



lang_json_to_js('lang.json')
word_lists = [
	'afr',
	'ara',
	'bul',
	'cat',
	'hrv',
	'cze',
	'dan',
	'dut',
	'est',
	# 'fao',
	# 'fin',

	'ger',
	'ger2',

	'grc',
	'heb',
	'hun',
	'ice',
	'gle',
	'ita',
	'lat',
	'lav',
	'lit',
	'mlg',

	'ind',
	'zsm',

	'nob',
	# 'nno',

	'pol',
	'por',
	'rum',
	'rus',
	'gla',
	'slo',
	'slv',
	'swe',
	'tur',
	'ukr',
	'wel',

	# 'tam'
	# 'bopo',
	# 'pin',
	# 'ipa',
	# 'old',
]
with alive_bar(len(word_lists)) as bar:
	for word_list in word_lists:
		word_list_jsonl_to_js(word_list)
		bar()