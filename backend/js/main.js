//* General
var nameBrands = ["Hasbro", "Mattel", "J. W. Spear & Sons", "Spear's Games", "Selchow & Righter"];
var rtlLangs = ["ara", "heb"];
var wordLists = {};

function deepCopy(arr) {
	return structuredClone(arr);
}

function uniquify(arr) {
	let uniques = [];
	let itemsFound = {};
	for(let i = 0, n = arr.length; i < n; i++) {
		let stringified = JSON.stringify(arr[i]);
		if (itemsFound[stringified]) continue;
		uniques.push(arr[i]);
		itemsFound[stringified] = true;
	}
	return uniques;
}



//* Strings
String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != "undefined" ? args[number] : match;
	});
}

function slugify(str) {
	return String(str)
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
		return index === 0 ? word.toLowerCase() : word.toUpperCase();
	}).replace(/\s+/g, "");
}

function camelToKebab(camel) {
	let kebab = camel.replace(/([a-zà-žα-ωά-ώ])([A-ZÀ-ŽΑ-Ω])/g, '$1-$2')
					 .replace(/([0-9])([A-ZÀ-ŽΑ-Ωa-zà-žα-ωά-ώ])/g, '$1-$2')
					 .replace(/([A-ZÀ-ŽΑ-Ω])([A-ZÀ-ŽΑ-Ω][a-zà-žα-ωά-ώ])/g, '$1-$2')
					 .toLowerCase();
	return kebab;
}



//* Arrays
Array.prototype.shuffle = function() {
	let i = this.length;
	while (i > 1) {
		let j = (Math.random() * i--) | 0;
		let temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}

function newTileMap(dimension) {
	return Array(dimension).fill().map(() => Array(dimension).fill(null));
}

function transpose(arr) {
	return arr[0].map((col, i) => arr.map(row => row[i]));
}

function tileMapToString(arr) {
	return JSON.stringify(arr)
		.replaceAll("[[", "[")
		.replaceAll("]]", "]")
		.replaceAll("],", "],\n");
}