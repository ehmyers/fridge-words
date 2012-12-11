$(document).ready(function() {
	var numDivs = 15;
	var highestIndex = 0;
	var currentIndex = 0;
	window.relativeX = 0;
	window.relativeY = 0;

	var words = [];
	$.getJSON("externals/words.json", function(data) {
		words = data.words;
		//console.log("The length of data is " + data.words.length);

		// fri[d/n]ge words swap
		setInterval(function() {
			$('#header').html('fringe words');
		}, 5350); // <- 5.35 seconds
		setInterval(function() {
			$('#header').html('fridge words');
		}, 5500); // <- 5.5 seconds

		// creating the individual magnets
		var generatedIndexes = [];
		for (var i = 0; i < numDivs; i++) {
			// manually place first magnets
			if (i == 0) {
				var randIndexIntro = Math.floor(Math.random()*words.length);
				var randWord = words[randIndexIntro];
				while (randWord.pos != "noun") {
					randIndexIntro = Math.floor(Math.random()*words.length);
					randWord = words[randIndexIntro];
				}
				
				var newMagnet = $("<div class='drag magnet' data-index='" + randIndexIntro + "'><span>" + randWord.word + "</span></div>");
				newMagnet.offset({"top": 100, "left": 100});
				// randomizing the angle of the magnet
				var randAngle = Math.floor(Math.random()*10-5);
				newMagnet.css("-moz-transform", "rotate(" + randAngle + "deg)");
				// adding new magnet to screen and bucket
				$(".testdiv").append(newMagnet);
				generatedIndexes.push(randIndex);
				console.log(randWord.word);

			}

			// getting the index
			var randIndex = Math.floor(Math.random()*words.length);
			while ($.inArray(randIndex, generatedIndexes) != -1) { //generatedIndexes.contains(randIndex)
				randIndex = Math.floor(Math.random()*words.length);
			}
			generatedIndexes.push(randIndex); // adds to the bucket, yo

			// using the index, getting word
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

	// oulipo's n+7 constraint
		setInterval(function() {
			var randMag = $(".magnet")[Math.floor(Math.random()*numDivs)];
			var randWord = $(randMag).children().html();
			var oldWordIndex;
			var randWordPos;
			// finds the word within the json file
			for (var i=0; i<words.length; i++) {
				if (randWord == words[i].word) {
					randWordPos = words[i].pos;
					oldWordIndex = i;
					break;
				}
			}
			// searches all other pos for matches
			var posCounter = 7;
			var newWord;
			for (var i=oldWordIndex; true; i++) {
				// loops around to beginning
				if (i == words.length) {
					i = 0;
				}
				if (randWordPos == words[i].pos) {
					posCounter--;
				}
				if (posCounter == 0) {
					newWord = words[i].word;
					break;
				}
			}
			// switches out randWord with newWord
			$(randMag).html("<span>" + newWord + "</span>");
			console.log(randWord + " -> " + newWord);
		}, Math.random()*10000 + 2000);
});

// actually moving the magnets
$("*").mousemove(function(e) {
	$(".dragging").css({'top':e.pageY - relativeY,'left':e.pageX - relativeX});
});

// // lightbox code for intro
// function closeLightbox() {
// 	$('.lightbox').fadeOut();
// }