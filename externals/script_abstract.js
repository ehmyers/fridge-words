/* globals: $ */
var $ = window.$,
    jQuery = window.jQuery;

function fridgeSwap() {
    "use strict";
    // swaps the d/n in fri[d/n]ge
    setInterval(function () {
        $('#header').html('fringe words');
    }, 5350); // <- 5.35 seconds
    setInterval(function () {
        $('#header').html('fridge words');
    }, 5500); // <- 5.5 seconds
}

function getRandIndexPos(words, pos) { // with part of speech
    "use strict";
    var randIndexIntro = Math.floor(Math.random() * words.length),
        randWord = words[randIndexIntro];
    while (randWord.pos !== pos) {
        randIndexIntro = Math.floor(Math.random() * words.length);
        randWord = words[randIndexIntro];
    }
    return randIndexIntro;
}

function makeNewMagnetDiv(words, randIndexIntro) {
    "use strict";
    var word = words[randIndexIntro].word;
    return $("<div class='drag magnet' data-index='" + randIndexIntro + "'><span>" + word + "</span></div>");
}

function randomAngle(newMagnet) {
    "use strict";
    // randomizing the angle of the magnet
    var randAngle = Math.floor(Math.random() * 10 - 5);
    newMagnet.css("-moz-transform", "rotate(" + randAngle + "deg)");
}

function createFirstMagnets(words, randIndex) {
    "use strict";
    // creates the noun of the sample sentence
    var randIndexIntro = getRandIndexPos(words, "noun"),
        newMagnet1 = makeNewMagnetDiv(words, randIndexIntro),
        newMagnet2 = makeNewMagnetDiv(words, randIndexIntro),
        newMagnet3 = makeNewMagnetDiv(words, randIndexIntro);

    newMagnet1.offset({"top": 100, "left": 100});
    randomAngle(newMagnet1);
    $(".testdiv").append(newMagnet1);
    window.generatedIndexes.push(randIndexIntro);

    // creates the verb of the sample sentence
    randIndexIntro = getRandIndexPos(words, "verb");
    newMagnet2.offset({"top": 135, "left": 95});
    randomAngle(newMagnet2);
    $(".testdiv").append(newMagnet2);
    window.generatedIndexes.push(randIndexIntro);

    // creates the second noun of the sample sentence
    randIndexIntro = getRandIndexPos(words, "noun");
    newMagnet3.offset({"top": 170, "left": 100});
    randomAngle(newMagnet3);
    $(".testdiv").append(newMagnet3);
    window.generatedIndexes.push(randIndexIntro);
}

function getRandIndex(words) { // without part of speech
    "use strict";
    var randIndex = Math.floor(Math.random() * words.length);
    while ($.inArray(randIndex, window.generatedIndexes) !== -1) {
        randIndex = Math.floor(Math.random() * words.length);
    }
    window.generatedIndexes.push(randIndex); // adds to the bucket, yo
    return randIndex;
}

function randomPlacement(newMagnet) {
    "use strict";
    // randomizing the placement of the magnets
    var browserWidth = $(window).width(),
        browserHeight = $(window).height(),
        randomX = Math.floor(Math.random() * (browserWidth - 290) + 200),
        randomY = Math.floor(Math.random() * (browserHeight - 200) + 100);
    newMagnet.offset({"top": randomY, "left": randomX});
    $(".testdiv").append(newMagnet);
}

function makeMagnet(words, randIndex) {
    "use strict";
    // using the index, getting word
    // checkIndexes(words, randIndex);
    var randIndexIntro = getRandIndex(words, "noun"),
        newMagnet = makeNewMagnetDiv(words, randIndexIntro);
    randomPlacement(newMagnet);
    randomAngle(newMagnet);
    $(".testdiv").append(newMagnet);
    window.generatedIndexes.push(randIndexIntro);
}

function checkIndexes(words, randIndex) {
    "use strict";
    // getting the index
    while ($.inArray(randIndex, window.generatedIndexes) !== -1) {
        randIndex = Math.floor(Math.random() * words.length);
    }
    window.generatedIndexes.push(randIndex); // adds to the bucket, yo
}

function findWord(words, randWord) {
    "use strict";
    var i;
    // finds the word within the json file
    for (i = 0; i < words.length; i += 1) {
        if (randWord === words[i].word) {
            return i;
        }
    }
}

function findWordPos(words, randWord) {
    "use strict";
    var i;
    for (i = 0; i < words.length; i += 1) {
        if (randWord === words[i].word) {
            return words[i].pos;
        }
    }
}

function searchWord(words, oldWordIndex, oldWordPos) {
    "use strict";
    // searches all other pos for matches
    var posCounter = 7,
        newWord,
        i;
    for (i = oldWordIndex; true; i += 1) {
        // loops around to beginning
        if (i === words.length) {
            i = 0;
        }
        if (oldWordPos === words[i].pos) {
            posCounter -= 1;
        }
        if (posCounter === 0) {
            return words[i].word;
        }
    }
}

$(document).ready(function () {
    "use strict";
    var numDivs = 15,
        highestIndex = 0,
        currentIndex = 0,
        words = [],
        randIndex = Math.floor(Math.random() * words.length),
        i;

    window.relativeX = 0;
    window.relativeY = 0;
    window.generatedIndexes = [];

    words = window.words.words;
    //console.log("The length of data is " + data.words.length);
    fridgeSwap();
    //
    // creating magnets
    for (i = 0; i < numDivs; i += 1) {
        if (i <= 2) { // 
            if (i === 0) { // creates three magnets at once
                createFirstMagnets(words, randIndex);
            }
        } else {
            makeMagnet(words, randIndex);
        }
    }

    // adding class on mousedown, etc
    $(".magnet").mousedown(function (e) {
        var offset = $(this).offset(),
            currentIndex = parseInt($(this).css("z-index"), 10);

        window.relativeX = (e.pageX - offset.left);
        window.relativeY = (e.pageY - offset.top);
        $(this).addClass("dragging");
        // making the clicked magnet come to the top
        if (highestIndex > currentIndex) {
            currentIndex = highestIndex + 1;
        }
        $(this).css("z-index", currentIndex);
        highestIndex += 1;
    });
    // removing the class on mouseup
    $("*").mouseup(function () {
        $(".magnet").removeClass("dragging");
        $(".lightbox").fadeOut("fast");
    });
    // actually moving the magnets
    $("*").mousemove(function (e) {
        $(".dragging").css({'top': e.pageY - relativeY, 'left': e.pageX - relativeX});
    });

    // oulipo's n+7 constraint
    setInterval(function () {
        var randMag = $(".magnet")[Math.floor(Math.random() * numDivs)],
            randWord = $(randMag).children().html(),
            oldWordIndex = findWord(words, randWord),
            oldWordPos = findWordPos(words, randWord),
            newWord = searchWord(words, oldWordIndex, oldWordPos);

        $(randMag).html("<span>" + newWord + "</span>");
        console.log(randWord + " -> " + newWord);
    }, Math.random() * 4000 + 2000);
});