//* Visual functionality
$.fn.moveTo = function(element, duration = TileFE.moveDur) {
	$(this).animate({
		"top": $(element).offset().top,
		"left": $(element).offset().left
	}, duration);
}

$.fn.changeLetterFE = function(letter) {
	$(this).attr("data-letter", letter);
	$(this).find(".tile-letter").html(letter);
}

$.fn.stripFE = function() {
	let $this = $(this);
	let blank = JSON.parse($this.attr("data-blank"));

	$this.attr("data-state", "bag");
	if (blank) $this.attr("data-letter", "");
	$this.attr("data-rack-index", "");
	$this.attr("data-row", "");
	$this.attr("data-col", "");
	$this.attr("data-exchange", "false");
}

function generateTileBagFE() {
	$(".tilebag-count").html(Game.tileBag.length);

	tileBagContainer.empty();
	for (let t = 0, tn = Game.tileBag.length; t < tn; t++) {
		let newTileElement = generateTileFE(Game.tileBag[t]);
		let rotLimit = 8;
		let randomRot = Math.random() * 2 * rotLimit - rotLimit;

		newTileElement.css({
			"transform": `rotate(${randomRot}deg)`,
			"-webkit-transform": `rotate(${randomRot}deg)`
		});
		tileBagContainer.append(newTileElement);
	}
}

function sortTileBagFE() {
	let tileElements = tileBagContainer.children(".tile").get();
	tileElements.sort((a, b) => $(a).attr("data-bag-index") - $(b).attr("data-bag-index"));
	$.each(tileElements, function(i, tile) {
		tileBagContainer.append(tile);
	});
}

function generateBoardFE() {
	/* $(".board-letter-container").empty();
	$(".board-number-container").empty();
	for (let i = 0; i < Game.board.length; i++) {
		let letter = Game.alphabet[i];
		if (i >= Game.alphabet.length) {
			letter = Game.alphabet[i % Game.alphabet.length];
			for (let j = 0; j < Math.floor(i / Game.alphabet.length); j++) {
				letter += Game.alphabet[i % Game.alphabet.length];
			}
		}

		$(".board-letter-container").append(`<div class="board-letter">${letter}</div>`);
		$(".board-number-container").append(`<div class="board-number">${i + 1}</div>`);
	} */

	$(".cell").remove();
	for (let r = 0; r < Game.board.length; r++) {
		for (let c = 0; c < Game.board[r].length; c++) {
			let id = Game.board[r][c];
			let cellElement = $(`
				<div class="cell" data-cell-id="${id}" data-row="${r}" data-col="${c}">
					<div class="cell-indicator"></div>
				</div>
			`);

			if (id == 1) {
				cellElement.append(i_star);
			} else if (id > 1) {
				let premium = Game.premiumCells.find(x => x.id === id);
				cellElement.append(`
					<div class="cell-text">${premium.text}</div>
					<div class="cell-abbr">${premium.abbr}</div>
				`);
			}
	
			$(".board").append(cellElement);
		}
	}
}

function generateRacksFE() {
	$(".rack-tiles").empty();

	for (let i = 0; i < Game.rackSize; i++) {
		$(".rack-tiles").append(`
			<div class="tile-slot">
				<div class="tile-slot-indicator"></div>
			</div>
		`);
	}
}

function generateBlankOptionsFE() {
	$(".blank-option-container").empty();
	for (let l = 0, ln = Game.tileSet.length; l < ln; l++) {
		if (Game.tileSet[l].letter == "?") continue;
		let letter = Game.tileSet[l].letter;
		let optionInput = $(`<input type="radio" id="blank-option-${letter}" name="blank-option">`);
		let optionLabel = $(`<label class="btn blank-option" for="blank-option-${letter}" data-letter="${letter}" data-char-count="${letter.length}">${letter}</label>
		`);
		optionLabel.btnify();
		$(".blank-option-container").append(optionInput, optionLabel);
	}
}

function changePlayerTo(player) {
	Game.currentPlayer = player;
	$(".play-screen").attr("data-current-player", player.type);
}

function drawTilesFE(player, numTiles) {
	let numTilesLeft = player.rackTiles.length - numTiles;

	for (let t = 0, tn = player.rackTiles.length; t < tn; t++) {
		let correspondingSlot = $(`.${player.type}-rack-tiles .tile-slot`).eq(t);

		if (t < numTilesLeft) {
			let tile = $(`.tile[data-player="${player.type}"][data-state="rack"]`).eq(t);
			tile.attr("data-rack-index", t);
			tile.moveTo(correspondingSlot, TileFE.moveDurFast);
		} else {
			let bagIndex = player.rackTiles[t].bagIndex;
			let tile = $(`.tile[data-state="bag"][data-bag-index="${bagIndex}"]`);
			
			tile.detach().appendTo(".play-screen")
			.attr({
				"data-state": "rack",
				"data-rack-index": t,
				"data-player": player.type
			})
			.css({
				"left": tileBagDispenser.offset().left,
				"top": tileBagDispenser.offset().top,
				"transform": ""
			});
			setTimeout(function() {
				tile.moveTo(correspondingSlot);
			}, (t - numTilesLeft + 1) * TileFE.moveDelay);
		}
	}

	$(".tilebag-count").html(Game.tileBag.length);
}

function recallTilesFE(player) {
	$(`.tile[data-player="${player.type}"][data-state="placed-rack"]`).each(function() {
		let rackIndex = $(this).attr("data-rack-index");
		let correspondingSlot = $(`.${player.type}-rack-tiles .tile-slot`).eq(rackIndex);

		$(this).attr("data-state", "rack");
		$(this).moveTo(correspondingSlot);
	});
}

function exchangeTilesFE(player) {
	$(`.tile[data-player="${player.type}"][data-exchange="true"]`).each(function() {
		$(this).stripFE();
		$(this).detach().appendTo(tileBagContainer);
	});
	sortTileBagFE();
}

function testPlayFE() {
	let tilesPlayed = Game.User.rackTiles.filter(tile => tile.state === "placed-rack");
	Game.User.testPlay(tilesPlayed);
	$(".play-btn").attr("disabled", !Game.User.currentPlay.valid);
	if (Game.User.currentPlay.valid) $(".turn-points").html(`(${Game.User.currentPlay.data.score})`);
}

function applyPlayFE(player, play) {
	if (player.type == "bot") {
		for (let t = 0; t < play.tilesPlayed.length; t++) {
			let tile = play.tilesPlayed[t];
			let rackIndex = tile.rackIndex;
			let blank = tile.blank;
			let correspondingTile = $(`.tile[data-player="bot"][data-state="rack"][data-rack-index="${rackIndex}"]`);
			let correspondingCell = $(`.cell[data-row="${tile.row}"][data-col="${tile.col}"]`);

			correspondingTile.attr("data-state", "placed-rack");
			if (blank) correspondingTile.changeLetterFE(tile.letter);

			setTimeout(function() {
				correspondingTile.moveTo(correspondingCell);
			}, t * TileFE.moveDelay);
		}
	}

	$(`.tile[data-player="${player.type}"][data-state="placed-rack"]`).attr("data-state", "placed-board");
	$(`.${player.type}-score-box`).find(".player-score").html(player.score);
}

function addToHistory(player, type, content = "") {
	let messageString = "";
	let icon = i_user;
	if (player.type == "bot") icon = i_bot;

	switch(type) {
		case "talk":
			messageString = `"${content}"`;
			break;
		case "play":
			let wordStrings = content.scoredWords;
			for (let w = 0, wn = wordStrings.length; w < wn; w++) {
				wordStrings[w] = `<b>${wordStrings[w].string}</b>`;
			}
	
			let wordsString = "";
			if (wordStrings.length == 1) {
				wordsString = wordStrings[0];
			} else if (wordStrings.length == 2) {
				wordsString = `${wordStrings[0]} and ${wordStrings[1]}`;
			} else if (wordStrings.length > 2) {
				let lastWord = wordStrings.pop();
				wordsString = wordStrings.join(", ") + ", and " + lastWord;
			}
	
			messageString = `${player.name} played ${wordsString} and scored <b>${content.score}</b> points.`;
			break;
		case "skip":
			let pronoun = Game.User.name == "You" ? "your" : "their";
			messageString = `<i>${player.name} skipped ${pronoun} turn.</i>`;
			break;
		case "exchange":
			let plural = (content > 1) ? "s" : "";
			messageString = `${player.name} exchanged <b>${content}</b> tile${plural}.`;
			break;
		case "other":
			messageString = `<i>${content}</i>`;
			break;
	}

	historyContainer.append(`
		<div class="play-history-message" data-player="${player.type}">
			<div class="player-icon">${icon}</div>
			<div class="play-history-text">${messageString}</div>
		</div>
	`)
	.animate({
		scrollTop: historyContainer.prop("scrollHeight")
	}, TileFE.moveDurFast);
}

function showDialog(dialog) {
	Game.currentDialog = dialog;
	$(".play-screen").addClass("show-dialog");
	$(".play-screen").attr("data-dialog", dialog);
	$(`.${dialog}-dialog`).addClass("current-dialog");
}

function hideDialog() {
	Game.currentDialog = null;
	$(".play-screen").removeClass("show-dialog");
	$(".play-screen").attr("data-dialog", "");
	$(".dialog").removeClass("current-dialog");
}



//* Play functionality
function newGameFE() {
	$(":root").css("--board-dimension", Game.board.length);
	$(".play-screen").attr("data-current-player", "");
	$(".user-score-box .player-name").html(Game.User.name);
	$(".user-score-box .player-score").html(Game.User.score);
	$(".bot-score-box .player-name").html(Game.Bot.name);
	$(".player-timer").css("--duration", (Game.Bot.botDiffics[Game.Bot.botDiffic].maxMs / 1000 + 1) + "s");
	$(".bot-score-box .player-score").html(Game.Bot.score);
	$(".play-history-textbox").attr("placeholder", `Chat with ${Game.Bot.name}...`);
	$(".blank-option-container").css("--columns", Game.rackSize);

	$(".play-screen .tile").remove();
	historyContainer.empty();

	generateTileBagFE();
	generateBoardFE();
	generateRacksFE();
	generateBlankOptionsFE();

	// let url = "https://semishawn.github.io/project-tiles/";
	let url = "./";
	BotWorker = new Worker(url + "backend/js/bot.js");
	BotWorker.onmessage = e => {
		let ply = e.data;
		console.log(ply);
	
		Game.Bot.plyCount++;
		switch(ply.type) {
			case "play":
				Game.Bot.consecutivePasses = 0;
				onValidPlay(Game.Bot, ply.data);
				break;
			case "skip":
				Game.Bot.consecutivePasses++;
				addToHistory(Game.Bot, "skip");
				break;
		}
	
		if (Game.isGameOver()) gameOverFE();
		else changePlayerTo(Game.User);
	}
}

function initiateGame() {
	Game.User.drawTiles(Game.rackSize);
	Game.Bot.drawTiles(Game.rackSize);

	drawTilesFE(Game.User, Game.rackSize);
	drawTilesFE(Game.Bot, Game.rackSize);

	setTimeout(function() {
		changePlayerTo(Game.firstPlayer);
		if (Game.firstPlayer.type == "bot") postBotPlay();
	}, Game.rackSize * TileFE.moveDelay + TileFE.moveDur);
}

function onValidPlay(player, play) {
	// Backend
	player.applyPlay(play);
	let numTilesDesired = play.tilesPlayed.length;
	let numTilesAllowed = Math.min(numTilesDesired, Game.tileBag.length);
	player.drawTiles(numTilesAllowed);

	// Frontend
	applyPlayFE(player, play);
	addToHistory(player, "play", play);
	drawTilesFE(player, numTilesAllowed);
	$(`.${player.type}-score-box`).find(".player-score").html(player.score);
}

function postBotPlay() {
	BotWorker.postMessage(JSON.stringify(Game));
}

function gameOverFE() {
	$(".end-player").removeClass("winner");
	$(`.${Game.ordinals[0].type}-end`).addClass("winner");
	$(`.${Game.ordinals[0].type}-end .end-player-ordinal`).html("WINNER!");
	$(`.${Game.ordinals[1].type}-end .end-player-ordinal`).html("2nd");

	for (let p = 0; p < Game.ordinals.length; p++) {
		let player = Game.ordinals[p];
		let avg = Math.round(player.finalScore / player.plyCount);

		$(`.${player.type}-end .end-player-name`).html(player.name);
		$(`.${player.type}-end .end-player-total-points`).html(player.score);
		$(`.${player.type}-end .end-player-unplayed-tiles`).html(player.rackReduction);
		$(`.${player.type}-end .end-player-opponent-tiles`).html("0");
		$(`.${player.type}-end .end-player-final-score`).html(player.finalScore);
		$(`.${player.type}-end .end-player-avg-score`).html(avg);
	}

	newScreen("end");
}

/* $(document).keydown(function(e) {
	if (e.code == "Tab") gameOverFE();
}); */



//* Button functionality
// Ditch
$(".leave-btn").on("click", function() {
	showDialog("leave");
});
$(".leave-dialog .dialog-confirm-btn").on("click", function() {
	BotWorker.terminate();
	newScreen("lang");
	hideDialog();
});
$(".leave-dialog .dialog-deny-btn").on("click", function() {
	hideDialog();
});

// Start Over
$(".restart-btn").on("click", function() {
	showDialog("restart");
});
$(".restart-dialog .dialog-confirm-btn").on("click", function() {
	BotWorker.terminate();
	Game.new(languages[lId].editions[eId]);

	newGameFE();
	initiateGame();
	hideDialog();
});
$(".restart-dialog .dialog-deny-btn").on("click", function() {
	hideDialog();
});

// Resign
$(".resign-btn").on("click", function() {
	showDialog("resign");
});
$(".resign-dialog .dialog-confirm-btn").on("click", function() {
	BotWorker.terminate();
	hideDialog();
	gameOverFE();
});
$(".resign-dialog .dialog-deny-btn").on("click", function() {
	hideDialog();
});

$(".tilebag-icon").on("click", function() {
	let showTime = parseFloat(tileBagWrapper.css("--show-duration")) * 1000;

	$(".tilebag-scroll-container").scrollTop(0);
	tileBagWrapper.addClass("show-tilebag");
	setTimeout(() => tileBagWrapper.removeClass("show-tilebag"), showTime);
});

// Play history
$(".play-history-textbox").on("propertychange input", function() {
	let $this = $(this);
	let isValidMessage = ($this.val() && $this.val().replace(/\s/g, "").length);
	$(".play-history-send-btn").attr("disabled", !isValidMessage);
});
$(".play-history-send-btn").on("click", function() {
	let textboxVal = $(".play-history-textbox").val();

	addToHistory(Game.User, "talk", textboxVal);
	$(".play-history-textbox").val("");
	$(".play-history-send-btn").attr("disabled", true);

	setTimeout(() => addToHistory(Game.Bot, "talk", Game.Bot.response), 1500);
});
$(document).keydown(function(e) {
	let isEnter = (e.code == "Enter");
	let isFocused = $(".play-history-textbox").is(":focus");
	let isDisabled = $(".play-history-send-btn").attr("disabled");
	if (isEnter && isFocused && !isDisabled) $(".play-history-send-btn").click();
});

// Rack
$(".shuffle-btn").on("click", function() {
	// Backend
	let randomRackIndexes = [...Array(Game.User.rackTiles.length).keys()];
	for (let t = 0, tn = Game.User.rackTiles.length; t < tn; t++) {
		let tile = Game.User.rackTiles[t];
		let oldRackIndex = tile.rackIndex;
		let randomRackIndexesIndex = Math.floor(Math.random() * randomRackIndexes.length);
		let newRackIndex = randomRackIndexes.splice(randomRackIndexesIndex, 1)[0];
		let correspondingTile = $(`.tile[data-player="user"][data-state*="rack"]`).eq(oldRackIndex);

		tile.rackIndex = newRackIndex;
		correspondingTile.attr("data-rack-index", newRackIndex);
	}
	Game.User.rackTiles.sort((a, b) => a.rackIndex - b.rackIndex);

	// Frontend
	let tileElements = $(".play-screen").children(`.tile[data-player="user"][data-state*="rack"]`).get();
	tileElements.sort((a, b) => $(a).attr("data-rack-index") - $(b).attr("data-rack-index"));
	$.each(tileElements, function(i, tile) {
		let rackIndex = $(tile).attr("data-rack-index");
		let state = $(tile).attr("data-state");
		let correspondingSlot = $(".user-rack-tiles .tile-slot").eq(rackIndex);

		$(".play-screen").append(tile);
		if (state == "rack") $(tile).moveTo(correspondingSlot, TileFE.moveDurFast);
	});
});
$(".recall-btn").on("click", function() {
	Game.User.recallTiles();
	recallTilesFE(Game.User);
	$(".play-btn").attr("disabled", true);
});

// Exchange
$(".exchange-btn").on("click", function() {
	// Game.User.recallTiles();
	// recallTilesFE(Game.User);
	showDialog("exchange");
});
$(".exchange-dialog .dialog-confirm-btn").on("click", function() {
	let numTilesExchanged = Game.User.rackTiles.filter(tile => tile.exchange === true).length;

	Game.User.exchangeTiles();
	exchangeTilesFE(Game.User);
	Game.User.drawTiles(numTilesExchanged);
	drawTilesFE(Game.User, numTilesExchanged);

	hideDialog();
	addToHistory(Game.User, "exchange", numTilesExchanged);
	changePlayerTo(Game.Bot);
	postBotPlay();
});
$(".exchange-dialog .dialog-deny-btn").on("click", function() {
	$(`.tile[data-exchange="true"]`).each(function() {
		let rackIndex = $(this).attr("data-rack-index");
		let correspondingSlot = $(".user-rack-tiles .tile-slot").eq(rackIndex);

		Game.User.rackTiles[rackIndex].exchange = false;

		$(this).attr("data-exchange", "false");
		$(this).moveTo(correspondingSlot, TileFE.moveDurFast);
	});

	hideDialog();
});

// Skip
$(".skip-btn").on("click", function() {
	showDialog("skip");
});
$(".skip-dialog .dialog-confirm-btn").on("click", function() {
	Game.User.recallTiles();
	recallTilesFE(Game.User);
	Game.User.plyCount++;
	Game.User.consecutivePasses++;

	hideDialog();
	addToHistory(Game.User, "skip");
	if (Game.isGameOver()) gameOverFE();
	else {
		changePlayerTo(Game.Bot);
		postBotPlay();
	}
});
$(".skip-dialog .dialog-deny-btn").on("click", function() {
	hideDialog();
});

// Play
$(".play-btn").on("click", function() {
	onValidPlay(Game.User, Game.User.currentPlay.data);
	Game.User.currentPlay = null;
	Game.User.plyCount++;
	Game.User.consecutivePasses = 0;

	$(".play-btn").attr("disabled", true);
	if (Game.isGameOver()) gameOverFE();
	else {
		changePlayerTo(Game.Bot);
		postBotPlay();
	}
});