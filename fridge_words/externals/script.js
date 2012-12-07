$(document).ready(function() {
	var numWords = 46;
	var numDivs = 15;

	var words = [];
	$.getJSON("externals/words.json", function(data) {
		words = data.words;
		console.log("The length of data is " + data.words.length);

		// creating the individual magnets
		for (var i = 0; i < numDivs; i++) {
			var randIndex = Math.floor(Math.random()*numWords);
			console.log("The random index is " + randIndex);
			var word = words[randIndex].word;
			console.log(words[randIndex]);
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
	});
});