$(document).ready(function() {

	// drag and drop code woop
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

}