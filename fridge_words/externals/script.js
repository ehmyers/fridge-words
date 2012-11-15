$(document).ready(function() {
	var numWords = 15;
	var numDivs = 15;
	var numBackgrounds = 5;
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

	// swapping background code
	thebackground();	
	$('div.background').fadeIn(500); // works for all the browsers other than IE
	$('div.background img').fadeIn(500); // IE tweak

});

function thebackground() {
	$('div.background img').css({opacity: 0.0});
	$('div.background img:first').css({opacity: 1.0});
	//var randTime = Math.floor(Math.random()*numBackgrounds) + 1;
	setInterval('change()',4000);
}

function change() {
	var current = ($('div.background img.show')? $('div.background img.show') : $('div.background img:first'));
	if ( current.length == 0 ) current = $('div.background img:first');
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div.background img:first') :current.next()) : $('div.background img:first'));
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 500);
	current.animate({opacity: 0.0}, 500)
	.removeClass('show');
};
// swapping backround end code
