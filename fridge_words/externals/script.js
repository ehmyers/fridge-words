$(document).ready(function() {
	var numDivs = 15;
	
	var words = [];
	$.getJSON("externals/words.json", function(data) {
		words = data.words;
		console.log("The length of data is " + data.words.length);

		// creating the individual magnets
		for (var i = 0; i < numDivs; i++) {
			var randIndex = Math.floor(Math.random()*words.length);
			var word = words[randIndex].word;
			var newMagnet = $("<div class='drag magnet' data-index='" + randIndex + "'><span>" + word + "</span></div>");
			
			// randomizing the placement of the magnets
			var browserWidth = $(window).width();
			var browserHeight = $(window).height();
			var randomX = Math.floor(Math.random()*browserHeight/6);
			var randomY = Math.floor(Math.random()*browserWidth/1.25);
			newMagnet.offset({"top": randomX, "left": randomY});
			$(".testdiv").append(newMagnet);

			// randomizing the angle of the magnet
			var randAngle = Math.floor(Math.random()*20-10);
			newMagnet.css("-moz-transform", "rotate(" + randAngle + "deg)");
		}

		// on click, making each magnet on top of all the others
		$(".magnet").css("z-index", "0");
		$(".magnet").click(function() {
			$(this).css("z-index", "1");
		});

		// adding/removing classes on mouseup/mousedown
		$(".magnet").mouseup(function() {
			$(this).addClass("dragging");
			console.log("dragging engaged!");
		});

		$(".magnet").mousedown(function() {
			$(this).removeClass("dragging");
			console.log("dragging DISengaged!");
		});
	});
});

// actually moving the magnets now
$(".dragging").mousemove(function() {
	$(this).offset({top:100, left:100});
	console.log("moving");
});