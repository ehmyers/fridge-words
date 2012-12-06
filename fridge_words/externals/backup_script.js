$(document).ready(function() {
	var numWords = 46;
	var numDivs = 15;
	var numBackgrounds = 5;
	var words = [
	{"word": "a", "pos": "article"},
	{"word": "abhor", "pos": "verb"},
	{"word": "adapt", "pos": "verb"},
	{"word": "an", "pos": "article"},
	{"word": "bird", "pos": "noun"},
	{"word": "bird", "pos": "noun"},
	{"word": "brains", "pos": "noun"},
	{"word": "chicken", "pos": "noun"},
	{"word": "crash", "pos": "verb"},
	{"word": "damage", "pos": "noun"},
	{"word": "damaged", "pos": "adjective"},
	{"word": "despise", "pos": "verb"},
	{"word": "distinct", "pos": "adjective"},
	{"word": "effect", "pos": "noun"},
	{"word": "emphasize", "pos": "verb"},
	{"word": "fuse", "pos": "verb"},
	{"word": "growth", "pos": "noun"},
	{"word": "hair", "pos": "noun"},
	{"word": "ignorant", "pos": "adjective"},
	{"word": "loathe", "pos": "verb"},
	{"word": "ly", "pos": "suffix"},
	{"word": "oath", "pos": "noun"},
	{"word": "offer", "pos": "verb"},
	{"word": "omnipresent", "pos": "adjective"},
	{"word": "peeling", "pos": "adjective"},
	{"word": "potato", "pos": "noun"},
	{"word": "recreate", "pos": "verb"},
	{"word": "reduce", "pos": "verb"},
	{"word": "reward", "pos": "noun"},
	{"word": "rhythm", "pos": "noun"},
	{"word": "rotting", "pos": "adjective"},
	{"word": "salty", "pos": "adjective"},
	{"word": "sample", "pos": "noun"},
	{"word": "search", "pos": "verb"},
	{"word": "snobbish", "pos": "adjective"},
	{"word": "spotted", "pos": "adjective"},
	{"word": "substitute", "pos": "verb"},
	{"word": "swift", "pos": "adjective"},
	{"word": "termite", "pos": "verb"},
	{"word": "the", "pos": "article"},
	{"word": "upbeat", "pos": "adjective"},
	{"word": "verse", "pos": "noun"},
	{"word": "walk", "pos": "verb"},
	{"word": "yell", "pos": "verb"},
	{"word": "yellow", "pos": "adjective"},
	{"word": "zombie", "pos": "noun"}
	]

	// getting the length of the json object
	// var lengthOfArray = "words.json".length;
	// console.log(lengthOfArray);

	// creating the individual magnets
	for (var i = 0; i < numDivs; i++) {
		var randIndex = Math.floor(Math.random()*numWords);
		var word = words[randIndex].word;
		var newMagnet = $("<div class='drag' id='magnet' data-index='" + randIndex + "'><span>" + word + "</span></div>");
		
		// setting the width of the magnet
		//var divLength = newMagnet.children("span").width();
		var ASDF = newMagnet.children("span");
		console.log(ASDF.width());
		newMagnet.width(newMagnet.width());

		// randomizing the placement of the magnets
		var browserWidth = $(window).width();
		var browserHeight = $(window).height();
		var randomX = Math.floor(Math.random()*browserHeight/6);
		var randomY = Math.floor(Math.random()*browserWidth/1.25);
		newMagnet.offset({"top": randomX, "left": randomY});
		$(".testdiv").append(newMagnet);

		// randomizing the angle of the magnet
		 
	}

	// sets the interval to change the words.  later improve to the n+7 constraint
	var changeWordInterval = window.setInterval(function() {
		var randIndex = Math.floor(Math.random()*numDivs) + 1;
		var newWordIndex = Math.floor(Math.random()*numWords);
		var newWord = words[newWordIndex].word;
		//$(".testdiv").children(":nth-child(" + randIndex + ")").width(divLength);
		$(".testdiv").children(":nth-child(" + randIndex + ")").html("<span>" + newWord + "</span>");
		
	}, 1000);

	// moving the clicked magnet to the top of all the others
	$(".drag").click(function() {
		var zindex = $(this).css("z-index", 1);
		console.log("The zindex is " + zindex);
	});

/***********************************************
* Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
var dragobject={
	z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
	initialize:function(){
		document.onmousedown=this.drag
		document.onmouseup=function(){this.dragapproved=0}
	},

	drag:function(e){
		var evtobj=window.event? window.event : e
		this.targetobj=window.event? event.srcElement : e.target
		if (this.targetobj.className=="drag"){
			this.dragapproved=1
			if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
				if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
					this.offsetx=parseInt(this.targetobj.style.left)
				this.offsety=parseInt(this.targetobj.style.top)
				this.x=evtobj.clientX
				this.y=evtobj.clientY
				if (evtobj.preventDefault)
					evtobj.preventDefault()
				document.onmousemove=dragobject.moveit
			}
		},

		moveit:function(e){
			var evtobj=window.event? window.event : e
			if (this.dragapproved==1){
				this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
				this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
				return false
			}
		}
	}

	dragobject.initialize()
	// end drag and drop code

});

// making text unselectable
function disableSelection(target){
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}
	target.style.cursor = "default"
}

/*	// woop dragging stuff.
	$(".draggable").mousedown(function(){
		$(this).addClass("dragging");
		console.log("dragging engaged!");
	});

	$(".draggable").mouseup(function(){
		$(this).removeClass("dragging");
		console.log("dragging DISengaged!");
	});

	$(".dragging").mousemove(function(){
		$(this).offset({top:100, left:100});
		console.log("moving");
	});

	var draggables = document.getElementsByClassName("draggable");
	for (var i = 0; i < draggables.length; i++) {
		disableSelection(draggables[i]);
	}*/

// // swapping background code
// thebackground();	
// $('div.background').fadeIn(500); // works for all the browsers other than IE
// $('div.background img').fadeIn(500); // IE tweak

// function thebackground() {
// $('div.background img').css({opacity: 0.0});
// $('div.background img:first').css({opacity: 1.0});
// //var randTime = Math.floor(Math.random()*numBackgrounds) + 1;
// setInterval('change()',4000);
// }

// function change() {
// 	var current = ($('div.background img.show')? $('div.background img.show') : $('div.background img:first'));
// 	if ( current.length == 0 ) current = $('div.background img:first');
// 	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div.background img:first') :current.next()) : $('div.background img:first'));
// 	next.css({opacity: 0.0})
// 	.addClass('show')
// 	.animate({opacity: 1.0}, 500);
// 	current.animate({opacity: 0.0}, 500)
// 	.removeClass('show');
// };
// swapping backround end code

// disableSelection(document.body)
