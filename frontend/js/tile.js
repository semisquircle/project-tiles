var TileDrag = {
	selector: `.tile[data-player="user"][data-state*="rack"]`,
	mousedown: false,
	active: false,
	element: null,
	startX: 0,
	startY: 0,

	reset: function() {
		this.mousedown = false;
		this.active = false;
		this.element = null;
		this.startX = 0;
		this.startY = 0;
	}
}



//* Drag
$(".play-screen").on("mouseenter", ".cell", function() {$(this).addClass("cell-hover")})
				 .on("mouseleave", ".cell", function() {$(this).removeClass("cell-hover")});

$(".play-screen").on("mousedown", TileDrag.selector, function(e) {
	TileDrag.mousedown = true;
	TileDrag.element = $(this);
	TileDrag.startX = e.clientX;
	TileDrag.startY = e.clientY;
});

$(".play-screen").on("mousemove", function(e) {
	if (TileDrag.mousedown) {
		let distance = Math.round(Math.sqrt(Math.pow(TileDrag.startY - e.clientY, 2)
			+ Math.pow(TileDrag.startX - e.clientX, 2)));

		if (!TileDrag.active) TileDrag.active = (distance > 5);
		else {
			$(".play-screen").attr("data-dragging", true);
			TileDrag.element.attr("data-state", "dragging");
			TileDrag.element.css({
				"left": e.clientX - (bigTileDimension / 2) + "px",
				"top": e.clientY - (bigTileDimension / 4) + "px"
			});
		}
	}
})
.on("mouseup", function(e) {
	if (TileDrag.active) {
		let rackIndex = TileDrag.element.attr("data-rack-index");
		let tile = Game.User.rackTiles[rackIndex];
		let hoveredCell = $(e.target);

		//* Success
		if (hoveredCell.hasClass("cell")) {
			let cellRow = parseInt(hoveredCell.attr("data-row"));
			let cellCol = parseInt(hoveredCell.attr("data-col"));

			// Backend
			tile.state = "placed-rack";
			tile.row = cellRow;
			tile.col = cellCol;

			// Frontend
			TileDrag.element.attr({
				"data-state": "placed-rack",
				"data-row": cellRow,
				"data-col": cellCol
			}).css({
				"left": hoveredCell.offset().left,
				"top": hoveredCell.offset().top
			});

			if (tile.letter == null) TileDrag.element.click();
		}

		//! Fail
		else {
			let correspondingSlot = $(`.user-rack-tiles .tile-slot`).eq(rackIndex);

			// Backend
			tile.state = "rack";
			tile.row = null;
			tile.col = null;

			// Frontend
			TileDrag.element.attr({
				"data-state": "rack",
				"data-row": "",
				"data-col": ""
			})
			.moveTo(correspondingSlot);
		}

		console.log(Game.User.currentPlay);
		testPlayFE();
	}

	TileDrag.reset();
	$(".play-screen").attr("data-dragging", false);
});



//* Dialogs
// Blank
$(".play-screen").on("click", TileDrag.selector + `[data-blank="true"]`, function() {
	let $this = $(this);

	if (Game.currentDialog == null) {
		let rackIndex = $this.attr("data-rack-index");
		let letter = $this.attr("data-letter");

		Game.currentBlank = Game.User.rackTiles[rackIndex];

		$(`[name="blank-option"]`).prop("checked", false);
		if (letter != null) $(`#blank-option-${letter}`).prop("checked", true);
		showDialog("blank");
	}
});
$(".play-screen").on("click", ".blank-option", function() {
	let rackIndex = Game.currentBlank.rackIndex;
	let letter = $(this).attr("data-letter");
	let correspondingTile = $(`.tile[data-player="user"][data-state*="rack"][data-rack-index="${rackIndex}"]`);

	Game.currentBlank.letter = letter;
	Game.currentBlank = null;

	correspondingTile.find(".tile-letter").charCount(letter);
	correspondingTile.changeLetterFE(letter);
	hideDialog();
	
	testPlayFE();
});

// Exchange
$(".play-screen").on("click", TileDrag.selector, function() {
	let $this = $(this);

	if (Game.currentDialog == "exchange") {
		let rackIndex = $this.attr("data-rack-index");
		let tile = Game.User.rackTiles[rackIndex];
		let exchange = tile.exchange;
		let correspondingSlot;

		if (!exchange) correspondingSlot = $(".exchange-dialog .tile-slot").eq(rackIndex);
		else correspondingSlot = $(`.user-rack-tiles .tile-slot`).eq(rackIndex);

		tile.exchange = !exchange;
		$this.attr("data-exchange", !exchange);
		$this.moveTo(correspondingSlot, TileFE.moveDurFast);
	}
});