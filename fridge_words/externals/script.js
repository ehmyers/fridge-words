$(document).ready(function() {
	var numDivs = 15;
	var highestIndex = 0;
	var currentIndex = 0;
	window.relativeX = 0;
	window.relativeY = 0;
	var fridge = true;

	var words = [];
	$.getJSON("externals/words.json", function(data) {
		words = data.words;
		//console.log("The length of data is " + data.words.length);

		// oulipo's n+7 constraint, still working on
		// setInterval(function() {
		// 	var randMag = $(".magnet")[Math.floor(Math.random()*numDivs)];
		// 	var word = $(randMag).children().html();
		// 	var wordpos = words[word].pos;
		// 	console.log(wordpos);
		// }, Math.random()*13000 + 2000);

		// fri[d/n]ge words swap
		setInterval(function() {
			$('#header').html('fringe words');
		}, 5350); // <- 5.35 seconds
		setInterval(function() {
			$('#header').html('fridge words');
		}, 5500); // <- 5.5 seconds

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

		// adding class on mousedown
		$(".magnet").mousedown(function(e) {
			var offset = $(this).offset();
			window.relativeX = (e.pageX - offset.left);
			window.relativeY = (e.pageY - offset.top);
			$(this).addClass("dragging");
			//console.log("dragging engaged!");

			// making the clicked magnet come to the top
			var currentIndex = parseInt($(this).css("z-index"));
			//console.log("This is the current index " + currentIndex);
			if (highestIndex > currentIndex) {
				currentIndex = highestIndex + 1;
			}
			$(this).css("z-index", currentIndex);
			highestIndex++;
			//console.log("This is the highest index " + highestIndex);
		});

		// removing the class on mouseup
		$("*").mouseup(function() {
			$(".magnet").removeClass("dragging");
			//console.log("dragging DISengaged!");
		});
	});
});

// actually moving the magnets
$("*").mousemove(function(e) {
	$(".dragging").css({'top':e.pageY - relativeY,'left':e.pageX - relativeX});
});