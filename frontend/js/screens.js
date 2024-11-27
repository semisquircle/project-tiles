//* Button Variables
var backBtnLang = $(".lang-screen .back-btn");
var backBtnEdition = $(".edition-screen .back-btn");
var backBtnPref = $(".pref-screen .back-btn");
var backBtnPlayers = $(".players-screen .back-btn");

var contBtnLang = $(".lang-screen .continue-btn");
var contBtnEdition = $(".edition-screen .continue-btn");
var contBtnPref = $(".pref-screen .continue-btn");
var contBtnPlayers = $(".players-screen .continue-btn");

var lId = null;
var eId = null;



//* Title screen
var logoLetters = [
	["T", "ת", "ت", "ट", "た", "タ"],
	["I", "Í", "И", "い", "イ"],
	["L", "Л", "Λ", "ל", "ل", "ल", "ら", "ラ"],
	["E", "É", "エ", "え"],
	["S", "Σ", "サ", "さ"]
];

$(".logo-tile").each(function(t) {
	let $this = $(this);
	for (let l = 0; l < logoLetters[t].length; l++) {
		let letter = logoLetters[t][l];
		$this.append(`<div class="logo-tile-letter">${letter}</div>`);
	}
});

var lastTileIndex = 0;
var tileIndex = 0;
var titleAnimInterval;
function titleAnim() {
	while (tileIndex == lastTileIndex) tileIndex = Math.floor(Math.random() * 5);
	let letterIndex = Math.ceil(Math.random() * (logoLetters[tileIndex].length - 1));

	// Going down
	$(".logo-tile-hover .logo-tile-letter").css("opacity", 0);
	$(".logo-tile-hover .logo-tile-letter").eq(0).css("opacity", 1);
	$(".logo-tile-hover").removeClass("logo-tile-hover");

	// Going up
	$(".logo-tile").eq(tileIndex).addClass("logo-tile-hover");
	$(".logo-tile-hover .logo-tile-letter").css("opacity", 0);
	$(".logo-tile-hover .logo-tile-letter").eq(letterIndex).css("opacity", 1);

	lastTileIndex = tileIndex;
}
function titleAnimStart() {titleAnimInterval = setInterval(titleAnim, 500);}
function titleAnimStop() {clearInterval(titleAnimInterval)};

$(".title-play-btn").on("click", function() {
	titleAnimStop();
	newScreen("lang");
});



//* Lang screen
for (let i = 0; i < languages.length; i++) {
	let langExonym = languages[i].exonym;
	let langEndonym = languages[i].endonym;

	let langOption = $(`
		<input type="radio" id="lang-option${i}" name="lang-option" autocomplete="off">
		<label class="lang-option btn" for="lang-option${i}">
			<div class="lang-exonym">${langExonym}</div>
			<div class="lang-endonym">${langEndonym}</div>
		</label>
	`);

	$(".lang-container").append(langOption);
}

$(".lang-container").on("click", ".lang-option", function() {
	let checkedOption = $("input:checked + .lang-option");
	if (checkedOption.length == 0)
		contBtnLang.removeAttr("disabled");
});

backBtnLang.on("click", function() {
	titleAnimStart();
	newScreen("title");
});

contBtnLang.on("click", function() {
	lId = $(`input[name="lang-option"]:checked`).attr("id");
	lId = parseInt(lId.replace("lang-option", ""));
	generateEditionsScreen();

	contBtnEdition.attr("disabled", true);
	newScreen("edition");
});



//* Edition screen
function generateEditionsScreen() {
	let langExonym = languages[lId].exonym;
	let langEndonym = languages[lId].endonym;
	let editions = languages[lId].editions;
	editions = editions.filter(function(edition) {
		if (edition.hasOwnProperty("botResponse")) return true;
		return false;
	});

	$(".edition-lang-exonym").html(langExonym);
	$(".edition-lang-endonym").html(langEndonym);

	$(".edition-options-container").empty();
	for (let i = 0, n = editions.length; i < n; i++) {
		let editionTitle = editions[i].title;
		let editionExonym = editions[i].langExonym;
		let editionEndonym = editions[i].langEndonym;
		let editionMfr = editions[i].mfr;
		let editionYear = editions[i].year;
		let editionRegion = editions[i].region;
		let editionRelease = `${editionYear} ${editionMfr}`;

		let newEditionInput = editionInputTemplate.clone();
		let newEditionLabel = editionLabelTemplate.clone();

		newEditionLabel.btnify();
		newEditionLabel.find(".edition-verified-icon").prepend(i_verified);
		newEditionLabel.find(".edition-box").prepend(i_box);
		newEditionLabel.find(".edition-globe").prepend(i_globe);

		if (nameBrands.includes(editionMfr)) {
			newEditionLabel.attr("data-verified", true);
			editionRelease = `${editionRegion}<br>${editionYear} ${editionMfr}`;
		}

		if (typeof editionRegion !== "undefined") {
			newEditionLabel.attr("data-sold", true);
		}

		newEditionInput.attr("id", "edition-option" + i);
		newEditionLabel.attr("for", "edition-option" + i);

		newEditionLabel.find(".edition-title").html(editionTitle)
		newEditionLabel.find(".edition-exonym").html(editionExonym);
		newEditionLabel.find(".edition-endonym").html(editionEndonym);
		newEditionLabel.find(".edition-release").html(editionRelease);

		$(".edition-screen .edition-options-container").append([newEditionInput, newEditionLabel]);
	}
}

backBtnEdition.on("click", function() {
	newScreen("lang");
});

contBtnEdition.on("click", function() {
	eId = $(`input[name="edition-option"]:checked`).attr("id");
	eId = parseInt(eId.replace("edition-option", ""));

	$.getScript(`backend/word-lists/js/${languages[lId].editions[eId].wordList}.js`, function() {
		Game.new(languages[lId].editions[eId]);

		// Continue button
		choseValidName = true;
		choseGoesFirst = false;
		checkContinueEnable();

		// Player intros
		$(".players-screen").attr("data-goes-first", "");
		$(".user-intro .player-intro-name").html(Game.User.name);
		$(".player-intro-current-chars").html(Game.User.name.length);
		$(".bot-intro .player-intro-name").html(Game.Bot.name);
		$(".bot-difficulty").html(Game.Bot.botDiffics[Game.Bot.botDiffic].name);
		$(".player-intro-tilebag").attr("data-clicked", false);
		$(".first-letter").html(Game.alphabet[0]);
		drawPlayOrderTiles();
		generateUserIcon();
		
		newScreen("players");
	});
});

$("body").on("click", ".edition-option", function() {
	if (!$(`input[name="edition-option"]`).is(":checked"))
		contBtnEdition.removeAttr("disabled");
});



//* Players screen
var usernameTextbox = $(".user-intro .player-intro-name");
var usernameCharLimit = 10;
var lastValidName = "";
var choseValidName = true;
var choseGoesFirst = false;

backBtnPlayers.on("click", function() {
	newScreen("edition");
});

contBtnPlayers.on("click", function() {
	Game.User.name = $(".user-intro .player-intro-name").text();
	newGameFE();
	setTimeout(() => initiateGame(), screenTransition);
	newScreen("play");
});

function checkContinueEnable() {
	if (choseValidName && choseGoesFirst) contBtnPlayers.removeAttr("disabled");
	else contBtnPlayers.attr("disabled", true);
}

function setEndOfContenteditable(contentEditableElement) {
	var range, selection;

	// Firefox, Chrome, Opera, Safari, IE 9+ 
	if (document.createRange) {
		range = document.createRange(); // Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement); // Select the entire contents of the element with the range
		range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection(); // get the selection object (allows you to change selection)
		selection.removeAllRanges(); // remove any selections already made
		selection.addRange(range); // make the range you have just created the visible selection
	}

	// IE 8 and lower
	else if (document.selection) { 
		range = document.body.createTextRange(); // Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement); // Select the entire contents of the element with the range
		range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
		range.select(); // Select the range (make it the visible selection
	}
}

usernameTextbox.on("propertychange input", function() {
	let currentValue = usernameTextbox.text();

	if (currentValue.length > 0) {
		if (currentValue.length <= usernameCharLimit) {
			choseValidName = true;
			lastValidName = currentValue;
		} else {
			usernameTextbox.html(lastValidName);
			setEndOfContenteditable(usernameTextbox[0]);
		}
		$(".user-intro .player-intro-descriptor").removeClass("invalid-chars");
	} else {
		choseValidName = false;
		$(".user-intro .player-intro-descriptor").addClass("invalid-chars");
	}

	$(".player-intro-current-chars").html(usernameTextbox.text().length);
	checkContinueEnable();
})
.on("cut copy paste", function(e) {
	e.preventDefault();
})
.keydown(function(e) {
	if (e.key == "Enter") {
		e.preventDefault();
		usernameTextbox.blur();
	}
})
.on("focusout", function() {
	$(".player-intro-name-edit-container").attr("data-editing", false);
});

$(".user-intro .player-icon").on("click", function() {
	generateUserIcon();
});

$(".player-intro-edit-icon").on("click", function() {
	$(".player-intro-name-edit-container").attr("data-editing", true);
	usernameTextbox.focus();
	setEndOfContenteditable(usernameTextbox[0]);
});

$(".player-intro-char-limit").html(usernameCharLimit);

$(".player-intro-tilebag").on("click", function() {
	let t = 0;
	$(`.tile[data-state="play-order"]`).each(function() {
		let player = $(this).attr("data-player");
		let correspondingSlot = $(`.${player}-intro .player-intro-tile-slot`);
		setTimeout(() => $(this).moveTo(correspondingSlot), t * TileFE.moveDelay);
		t++;
	});

	$(this).attr("data-clicked", true);

	setTimeout(function() {
		let player = Game.firstPlayer.type;
		$(".players-screen").attr("data-goes-first", player);
		choseGoesFirst = true;
		checkContinueEnable();
	}, 2 * TileFE.moveDur);
});

function drawPlayOrderTiles() {
	let players = [
		{type: "user", tile: null},
		{type: "bot", tile: null}
	];

	$(`.tile[data-state="play-order"]`).remove();
	for (let i = 0; i < players.length; i++) {
		let randomIndex = Math.floor(Math.random() * Game.tileBag.length);
		players[i].tile = Game.tileBag.splice(randomIndex, 1)[0];
		let newTileElement = generateTileFE(players[i].tile);

		newTileElement.attr({
			"data-state": "play-order",
			"data-player": players[i].type
		});

		$(".players-screen").append(newTileElement);
	}

	for (let i = 0; i < players.length; i++) Game.tileBag.push(players[i].tile);
	Game.sortTileBag();

	Game.firstPlayer = (players[0].tile.bagIndex < players[1].tile.bagIndex) ? Game.User : Game.Bot;
}

$(".bot-difficulty").click(function() {
	Game.Bot.botDiffic = (Game.Bot.botDiffic + 1) % 3;
	let nextDifficulty = Game.Bot.botDiffics[Game.Bot.botDiffic].name;
	$(this).html(nextDifficulty);
});



//* End screen
$(".rematch-btn").on("click", function() {
	Game.new(languages[lId].editions[eId]);

	hideDialog();
	newGameFE();
	setTimeout(() => initiateGame(), screenTransition);
	newScreen("play");
});

$(".new-edition-btn").on("click", function() {
	newScreen("lang");
});

$(".save-results-btn").on("click", function() {
	let time = new Date().toLocaleString();
		time = time.replaceAll("/", "-").replaceAll(",", "").replaceAll(" ", "_").replaceAll(":", "-");
	let filename = `PT_${time}.png`;
	domtoimage.toBlob($(".play-screen")[0]).then(function(blob) {
		window.saveAs(blob, filename);
	});
});