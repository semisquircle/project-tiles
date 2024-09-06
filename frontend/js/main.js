//* Variables
var currentScreen = null;
var inputBorderWidth = parseFloat($(":root").css("--input-border-width"));
var screenTransition = parseFloat($("main").css("transition-duration")) * 1000;
var inputTransition = parseFloat($(":root").css("--input-transition")) * 1000;
var bigTileDimension = $(".big-tile-sizer").outerWidth();

var tileBagWrapper =   $(".tilebag-wrapper");
var tileBagContainer = $(".tilebag-tiles-container");
var tileBagDispenser = $(".tilebag-dispenser");
var historyContainer = $(".play-history-scroll-container");

var url = "https://semiopteryx.github.io/project-tiles/";
// let url = "./";



//* Templates
var TileFE = {
	moveDur: 750,
	moveDurFast: 300,
	moveDelay: 200,
	template: $(`
		<div class="tile">
			<div class="tile-inside">
				<div class="tile-letter"></div>
				<div class="tile-points"></div>
			</div>
		</div>
	`)
}

var editionInputTemplate = $(`<input type="radio" id="" name="edition-option" autocomplete="off">`);
var editionLabelTemplate = $(`
	<label class="btn edition-option" for="" data-sold="false">
		<div class="edition-verified-icon"></div>

		<div class="edition-box">
			<div class="edition-title-isometric">
				<div class="edition-title-rotate">
					<div class="edition-title"></div>
				</div>
			</div>
		</div>

		<div class="edition-globe">
			<div class="edition-title-border">
				<div class="edition-title"></div>
			</div>
		</div>

		<div class="edition-lang">
			<div class="edition-exonym"></div>
			<div class="edition-endonym"></div>
		</div>

		<div class="edition-release"></div>
	</label>
`);



//* Visual
$.fn.maxZ = function(selector) {
	let topZ = 0;

	$(selector).each(function() {
		let thisZ = parseInt($(this).css("z-index"));
		if (thisZ >= topZ) topZ = thisZ;
	});

	$(this).css("z-index", topZ + 1);
}

$.fn.btnify = function() {
	let oldHtml = $(this).html();
	$(this).html(`
		<div class="btn-stalk btn-stalk1"></div>
		<div class="btn-stalk btn-stalk2"></div>
		<div class="btn-inside">${oldHtml}</div>
	`);
}

$.fn.charCount = function(letter) {
	$(this).attr("data-char-count", letter.length);
}

function generateTileFE(tile) {
	let newTileElement = TileFE.template.clone();

	newTileElement.find(".tile-letter").attr("data-char-count", 0);
	for (let prop in tile) {
		let kebabProp = camelToKebab(prop);
		let value = (tile[prop] == null) ? "" : tile[prop];
		newTileElement.attr(`data-${kebabProp}`, value);
	}

	if (!tile.blank) {
		newTileElement.attr("data-letter", tile.letter);
		newTileElement.find(".tile-letter").html(tile.letter);
		newTileElement.find(".tile-letter").charCount(tile.letter);
		newTileElement.find(".tile-points").html(tile.points);
	}

	return newTileElement;
}

function newScreen(screen) {
	currentScreen = screen;
	let screenId = $("." + screen + "-screen").index();
	$("main").css("margin-left", -100 * screenId + "vw");
}

function generateUserIcon() {
	i_user = fruit[Math.floor(Math.random() * fruit.length)];
	$(".user-intro .player-icon").html(i_user);
	$(".user-score-box .player-icon").html(i_user);
	$(".user-end .player-icon").html(i_user);
}

$(document).ready(function() {
	$(".btn").each(function() {
		$(this).btnify()
	});

	titleAnimStart();
	newScreen("title");
});



//* iFrame Post Messages
let music = $(".play-music")[0];
var musicAccessGranted = false;
var musicPlaying = false;
window.addEventListener("message", function(e) {
	let data = JSON.parse(e.data);

	if (data.type == "toggleAudio") {
		if (!musicAccessGranted) {
			music.play();
			$("body").click();
			musicAccessGranted = true;
		}

		music.volume = (musicPlaying) ? 0 : 0.2;
		musicPlaying = !musicPlaying;
	}

	else if (data.type == "changeTheme") {
		$("body").attr("data-theme", data.theme);
	}
});