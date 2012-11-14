$(document).ready(function() {
	var numWords = 15;
	var numDivs = 15;
	var words = [
		{"word": "abhor", "pos": "verb"},
		{"word": "brains", "pos": "noun"},
		{"word": "rotting", "pos": "adjective"},
		{"word": "chicken", "pos": "noun"},
		{"word": "walk", "pos": "verb"},
		{"word": "yellow", "pos": "adjective"},
		{"word": "potato", "pos": "noun"},
		{"word": "zombie", "pos": "noun"},
		{"word": "hair", "pos": "noun"},
		{"word": "despise", "pos": "verb"},
		{"word": "loathe", "pos": "verb"},
		{"word": "omnipresent", "pos": "adjective"},
		{"word": "search", "pos": "verb"},
		{"word": "peeling", "pos": "adjective"},
		{"word": "yell", "pos": "verb"}
	]

	for (var i = 0; i < numDivs; i++) {
		var randIndex = Math.floor(Math.random()*numWords);
		$(".testdiv").append("<div class='magnet' data-index='" + randIndex + "'>" + words[randIndex].word + "</div>");
	}

	var changeWordInterval = window.setInterval(function() {
		var randIndex = Math.floor(Math.random()*numDivs) + 1;
		var newWordIndex = Math.floor(Math.random()*numWords);
		var newWord = words[newWordIndex].word;
		$(".testdiv").children(":nth-child(" + randIndex + ")").html(newWord);
		

	}, 1000);

	// drag and drop code
	function allowDrop(ev) {
		ev.preventDefault();drag1
	}

	function drag(ev) {
		ev.dataTransfer.setData("Text",ev.target.id);
	}

	function drop(ev) {
		ev.preventDefault();
		var data=ev.dataTransfer.getData("Text");
		ev.target.appendChild(document.getElementById(data));
	}

	var currentWord = ("hello");
	// setting the width of the div based on text within
	function size() {
		var divLength = currentWord.length;
		console.log(divLength);
	}
	// end drag and drop code

});
