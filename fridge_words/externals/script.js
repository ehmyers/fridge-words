$(document).ready(function() {
	var numDivs = 15;
	var highestIndex = 0;
	var currentIndex = 0;

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
			var randomX = Math.floor(Math.random()*(browserHeight-200) + 100);
			var randomY = Math.floor(Math.random()*(browserWidth-140) + 20);
			newMagnet.offset({"top": randomX, "left": randomY});
			$(".testdiv").append(newMagnet);

			// randomizing the angle of the magnet
			var randAngle = Math.floor(Math.random()*10-5);
			newMagnet.css("-moz-transform", "rotate(" + randAngle + "deg)");
		}

		// adding/removing classes on mousedown/mouseup
		// also, making the clicked magnet come to the top
		$(".magnet").mousedown(function() {
			$(".magnet").removeClass("dragging");
			$(this).addClass("dragging");
			//console.log("dragging engaged!");

			// updating z-index
			var currentIndex = parseInt($(this).css("z-index"));
			//console.log("This is the current index " + currentIndex);
			if (highestIndex > currentIndex) {
				currentIndex = highestIndex + 1;
			}
			$(this).css("z-index", currentIndex);
			highestIndex++;
			//console.log("This is the highest index " + highestIndex);
		});

		$("*").mouseup(function() {
			$(".magnet").removeClass("dragging");
			//console.log("dragging DISengaged!");
		});
	});
});

// actually moving the magnets
$("*").mousemove(function(e) {
	console.log(e);
	$(".dragging").css({'top':e.pageY,'left':e.pageX});
});