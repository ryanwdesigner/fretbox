/*global console*/
/* eslint no-console: "off" */

var _chordIndex = 0;

dotXpositions = [45, 85, 124, 163];

dotYpositions = [124,108,92.5,78,62,47];

crossXposition = 8;

crossYpositions = [128,113,97,82,67,51];

majPatterns = [
    [0, 2, 2, 1, 0, 0,      0],
    [-1, 0, 2, 2, 2, 0,     1],
    [-1, -1, 0, 2, 3, 2,    2],
    [-1, -1, -1, 2, 2, 0,   3],
    [-1, -1, -1, 0, 1, 0,   4],
    [-1, -1, -1, 1, 0, 0,   5]
];

minPatterns = [
    [0, 2, 2, 0, 0, 0,      0],
    [-1, 0, 2, 2, 1, 0,     1],
    [-1, -1, 0, 2, 3, 1,    2],
    [-1, -1, -1, 2, 1, 0,   3],
    [-1, -1, -1, 1, 2, 0,   4],
    [-1, -1, 0, 3, 3, 3,    5]
];

maj7Patterns = [
    [0, -1, 1, 1, 0, -1,    0],
    [-1, 0, 2, 1, 2, 0,     1],
    [-1, -1, 0, 2, 2, 2,    2],
    [0, 2, 1, 1, -1, -1,    0],
    [-1, 3, 2, 0, 0, 0,     1],
    [-1, -1, 3, 2, 1, 0,    2]
];

min7Patterns = [
    [0, 2, 0, 0, 0, 0,      0],
    [-1, 0, 2, 0, 1, 0,     1],
    [-1, -1, 0, 2, 1, 1,    2],
    [0, -1, 0, 0, 0, -1,    0],
    [-1, 0, 2, 0, 1, 3,     1],
    [-1, 2, 0, 2, 0, 2,     1]
];

sus2Patterns = [
    [3, 0, 0, -1, -1, -1,   0],
    [-1, 3, 0, 0, -1, -1,   1],
    [-1, -1, 0, 2, 3, 0,    2],
    [-1, -1, -1, 2, 0, 0,   3],
    [-1, -1, -1, 2, 3, 0,   4],
    [-1, -1, -1, 0, 1, 1,   5]
]

sus4Patterns = [
    [3, 3, 0, -1, -1, -1,   0],
    [-1, 3, 3, 0, -1, -1,   1],
    [-1, -1, 2, 2, 0, -1,   2],
    [-1, -1, -1, 2, 3, 0,   3],
    [-1, -1, -1, 0, 1, 1,   4],
    [-1, -1, -1, 2, 0, 0,   5]
]

bigBoxY = [210, 172, 134, 96, 58, 20];

chordArray = [];


fretboardSixLetters = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
fretboardFiveLetters =["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"];
fretboardFourLetters =["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#","B"];
fretboardThreeLetters=["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"];
fretboardTwoLetters = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"];
fretboardOneLetters = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

chordTypeList = ["maj", "min","maj7","min7","sus2","sus4"];

function Chord() {
    this.key = "C maj";
    this.strings = [0, 0, 0, 0, 0, 0];
    this.trueStrings = [0, 0, 0, 0, 0, 0];
    this.rootString = 0;
    this.rootScalePos = 0;
    this.xPositions = [0, 0, 0, 0, 0, 0];
    this.chordName = "C MAJOR";
    this.chordID = "no-ID";
    this.chordnum = 0;

    this.fretboardSix =   [3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0];
    this.fretboardFive =  [7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0];
    this.fretboardFour =  [5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0];
    this.fretboardThree = [2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0];
    this.fretboardTwo =   [6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0];
    this.fretboardOne =   [3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0];

    this.rootIndex = 0;
}

function setKey(chord, newKey) {
    chord.key = newKey;

    switch (newKey) {
        case "C# maj":
            shiftFretboard(chord, 1);
            break;
        case "D maj":
            shiftFretboard(chord, 2);
            break;
        case "D# maj":
            shiftFretboard(chord, 3);
            break;
        case "E maj":
            shiftFretboard(chord, 4);
            break;
        case "F maj":
            shiftFretboard(chord, 5);
            break;
        case "F# maj":
            shiftFretboard(chord, 6);
            break;
        case "G maj":
            shiftFretboard(chord, 7);
            break;
        case "G# maj":
            shiftFretboard(chord, 8);
            break;
        case "A maj":
            shiftFretboard(chord, 9);
            break;
        case "A# maj":
            shiftFretboard(chord, 10);
            break;
        case "B maj":
            shiftFretboard(chord, 11);
        default:
            break;
    }
}

function shiftFretboard(chord, places) {
    // shifts each row of fretboard by places number of frets

    for (var i = 0; i < places; i++) {
        chord.fretboardOne.unshift(chord.fretboardOne.pop());
    }
    for (i = 0; i < places; i++) {
        chord.fretboardTwo.unshift(chord.fretboardTwo.pop());
    }
    for (i = 0; i < places; i++) {
        chord.fretboardThree.unshift(chord.fretboardThree.pop());
    }
    for (i = 0; i < places; i++) {
        chord.fretboardFour.unshift(chord.fretboardFour.pop());
    }
    for (i = 0; i < places; i++) {
        chord.fretboardFive.unshift(chord.fretboardFive.pop());
    }
    for (i = 0; i < places; i++) {
        chord.fretboardSix.unshift(chord.fretboardSix.pop());
    }
}

function generateChord(chord) {
    var rowNum;

    // randomly generate type of chord from chord type list
    var chordType = chordTypeList[Math.floor(Math.random() * chordTypeList.length)];

    // set root string of chord
    if (chordType == "maj") {
        rowNum = Math.floor(Math.random() * majPatterns.length);

        chord.rootString = majPatterns[rowNum][6];

        for (i = 0; i < 6; i++) {
            chord.strings[i] = majPatterns[rowNum][i];
        }
    }
    else if (chordType == "min") {
        rowNum = Math.floor(Math.random() * minPatterns.length);

        chord.rootString = minPatterns[rowNum][6];

        for (var i = 0; i < 6; i++) {
            chord.strings[i] = minPatterns[rowNum][i];
        }
    }
    else if (chordType == "maj7") {
        rowNum = Math.floor(Math.random() * maj7Patterns.length);

        chord.rootString = maj7Patterns[rowNum][6];

        for (var i = 0; i < 6; i++) {
            chord.strings[i] = maj7Patterns[rowNum][i];
        }
    }
    else if (chordType == "min7") {
        rowNum = Math.floor(Math.random() * min7Patterns.length);

        chord.rootString = min7Patterns[rowNum][6];

        for (var i = 0; i < 6; i++) {
            chord.strings[i] = min7Patterns[rowNum][i];
        }
    }
    else if (chordType == "sus2") {
        rowNum = Math.floor(Math.random() * sus2Patterns.length);

        chord.rootString = sus2Patterns[rowNum][6];

        for (var i = 0; i < 6; i++) {
            chord.strings[i] = sus2Patterns[rowNum][i];
        }
    }
    else if (chordType == "sus4") {
        rowNum = Math.floor(Math.random() * sus4Patterns.length);

        chord.rootString = sus4Patterns[rowNum][6];

        for (var i = 0; i < 6; i++) {
            chord.strings[i] = sus4Patterns[rowNum][i];
        }
    }

    // array of possible chord root positions
    this.rootPositions = [];

    //array of the selected string
    this.stringSelected = [];

    // sets stringSelected to contain appropriate string
    switch(chord.rootString) {
        case 0 : stringSelected = chord.fretboardOne;
            break;
        case 1 : stringSelected = chord.fretboardTwo;
            break;
        case 2 : stringSelected = chord.fretboardThree;
            break;
        case 3 : stringSelected = chord.fretboardFour;
            break;
        case 4 : stringSelected = chord.fretboardFive;
            break;
        case 5 : stringSelected = chord.fretboardSix;
            break;
        default:break;
    }

    //adds indexes of possible root positions to rootPositions
    for (i = 0; i < 12; i++) {
        if (chordType == "maj") {
            switch (stringSelected[i]) {
                case 1:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 4:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 5:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
        else if (chordType == "min") {
            switch (stringSelected[i]) {
                case 2:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 3:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 6:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
        else if (chordType == "maj7") {
            switch (stringSelected[i]) {
                case 1:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 4:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
        else if (chordType == "min7") {
            switch (stringSelected[i]) {
                case 2:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 3:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 6:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
        else if (chordType == "sus2") {
            switch (stringSelected[i]) {
                case 1:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 2:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 4:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 5:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 6:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
        else if (chordType == "sus4") {
            switch (stringSelected[i]) {
                case 1:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 2:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 3:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 5:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                case 6:
                    if(i >= chord.strings[chord.rootString]) {
                        rootPositions.push(i);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    //sets rootIndex to a random index value from the rootPositions array
    chord.rootIndex = rootPositions[Math.floor(Math.random() * rootPositions.length)];

    //assigns true string positions to array trueStrings
    for(i = 0; i < 6; i++) {
        if(chord.strings[i] > -1) {
            chord.trueStrings[i] = chord.strings[i] + (chord.rootIndex - chord.strings[chord.rootString]);
        }
        else {
            chord.trueStrings[i] = chord.strings[i];
        }
    }

    //set name of chord

    //find note at root
    var rootNote = "C";

    switch(chord.rootString) {
        case 0: rootNote = fretboardOneLetters[chord.trueStrings[chord.rootString]];
            break;
        case 1: rootNote = fretboardTwoLetters[chord.trueStrings[chord.rootString]];
            break;
        case 2: rootNote = fretboardThreeLetters[chord.trueStrings[chord.rootString]];
            break;
        case 3: rootNote = fretboardFourLetters[chord.trueStrings[chord.rootString]];
            break;
        case 4: rootNote = fretboardFiveLetters[chord.trueStrings[chord.rootString]];
            break;
        case 5: rootNote = fretboardSixLetters[chord.trueStrings[chord.rootString]];
            break;
        default:
            break;
    }

    chord.chordName = rootNote + " " + chordType;
}

function renderSymbols(chord) {
    //creates the dots/crosses
    
    var svgname = "drawBox" + chord.chordNum;
    console.log(svgname);
    var svg = document.getElementById(svgname);

    var diagname = "diagramStart" + chord.chordNum;
    var diagramStart = document.getElementById(diagname);

    var startNum = 100;

    for(i = 0; i < 6; i++) {
        if(chord.trueStrings[i] < startNum && chord.trueStrings[i] > -1) {
            startNum = chord.trueStrings[i];
        }
    }

    if(startNum > 1) {
        diagramStart.innerHTML = "<h1>" + startNum + "</h1>";
    }

    for(var i = 0; i < 6; i++) {
        if(chord.strings[i] == -1) {
            var cross = document.createElementNS("http://www.w3.org/2000/svg", 'text');

            cross.textContent = 'X';

            cross.setAttribute("x",crossXposition);
            cross.setAttribute("y",crossYpositions[i]);
            cross.setAttribute("fill","white");
            cross.setAttribute("font-size","12px");
            cross.setAttribute("font-weight","bold");
            svg.appendChild(cross);
        }
        else if(chord.trueStrings.includes(0)) {
            if(chord.trueStrings[i] == 0) {
                var dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

                dot.setAttribute("r","4");
                dot.setAttribute("stroke","white");
                dot.setAttribute("stroke-width","2px");
                dot.setAttribute("fill","none");
                dot.setAttribute("cx","14");
                dot.setAttribute("cy",dotYpositions[i] + 2);


                if(i == chord.rootString) {
                    dot.setAttribute("stroke","#5816f9");
                }

                svg.appendChild(dot);
            }
            else {
                var dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

                dot.setAttribute("r","6");
                dot.setAttribute("stroke","none");
                dot.setAttribute("fill","white");
                dot.setAttribute("cx",dotXpositions[chord.strings[i]-1]);
                dot.setAttribute("cy",dotYpositions[i]);


                if(i == chord.rootString) {
                    dot.setAttribute("fill","#5816f9");
                }

                svg.appendChild(dot);
            }
        }
        else {
            var dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

            dot.setAttribute("r","6");
            dot.setAttribute("stroke","none");
            dot.setAttribute("fill","white");
            dot.setAttribute("cx",dotXpositions[chord.strings[i]]);
            dot.setAttribute("cy",dotYpositions[i]);


            if(i == chord.rootString) {
                dot.setAttribute("fill","#5816f9");
            }

            svg.appendChild(dot);
        }
    }

    var target = document.getElementById(chord.chordID).getElementsByClassName("chordName")[0];
    target.innerHTML = "<h1>" + chord.chordName + "</h1>";
    
    target = document.getElementById(chord.chordID).getElementsByClassName("keyName")[0];
    target.innerHTML = "<text>KEY: " + chord.key + "</text>";
}

function addChord() {
    newChord = new Chord();
    setKey(newChord, document.getElementById("keySelect").value);
    generateChord(newChord);
    var div = document.createElement('div');
    div.setAttribute('class', 'chordbox');
    div.setAttribute("id","chord-"+_chordIndex);
    div.setAttribute("tabindex","-1");
    div.setAttribute("onclick","highlightChord(this.id)");
    div.setAttribute("onmouseover","this.style.border='3px solid #5816f9';");
    div.setAttribute("onmouseout","this.style.border='3px solid transparent';");
    
    newChord.chordID = "chord-" + _chordIndex;
    newChord.chordNum = _chordIndex;
    div.innerHTML = document.getElementById('chordtemplate').innerHTML;
    document.getElementById('chordList').insertBefore(div, document.getElementById('newChord'));
    
    var svg = document.getElementById("drawBox");
    svg.id = "drawBox" + _chordIndex;

    var diagramStart = document.getElementById("diagramStart");
    diagramStart.id = "diagramStart" + _chordIndex;
    
    renderSymbols(newChord);
    
    chordArray.push(newChord);

    _chordIndex++;

    disableButtons();
}

function toggleType(e) {
    if(e.checked == true) {
        chordTypeList.push(e.value);
    }
    else {
        var index = chordTypeList.indexOf(e.value)
        chordTypeList.splice(index, 1);
    }
}

function disableButtons(){
    var allChords = document.querySelectorAll(".chordBox");

    for(var i = 0; i < allChords.length; i++) {
        allChords[i].querySelector(".upButton").disabled = false;
        allChords[i].querySelector(".downButton").disabled = false;
    }

    allChords[0].querySelector(".upButton").disabled = true;
    allChords[allChords.length-1].querySelector(".downButton").disabled = true;
}

function deleteChord(e) {
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
    disableButtons();
}

function moveUp(e){
    e = e.parentNode.parentNode;
    var pointer = e.previousSibling;
    var chordList = document.getElementById("chordList");
    chordList.insertBefore(e, pointer);

    disableButtons();
}

function moveDown(e){
    e = e.parentNode.parentNode;
    var pointer = e.nextSibling;
    var chordList = document.getElementById("chordList");
    chordList.insertBefore(e, pointer.nextSibling);

    disableButtons();
}

function highlightChord(e) {
    document.querySelectorAll(".bigDot").forEach(item => item.parentNode.removeChild(item));
    document.querySelectorAll(".bigCross").forEach(item => item.parentNode.removeChild(item));
    
    var svg = document.getElementById("bigFretboardBox");
    var thenum = e.replace( /^\D+/g, '');
    var chord = chordArray[thenum];
    
    for(i = 0; i < 6; i++) {
        if(chord.trueStrings[i] == 0){
            var dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            
            dot.setAttribute("class","bigDot");
            dot.setAttribute("r","10");
            dot.setAttribute("stroke","white");
            dot.setAttribute("stroke-width","3px");
            dot.setAttribute("fill","none");
            dot.setAttribute("cx","-3px");
            dot.setAttribute("cy",bigBoxY[i]);
            
            if(i == chord.rootString){
                dot.setAttribute("stroke","#5816f9");
            }
            
            svg.appendChild(dot);
        }
        else if(chord.trueStrings[i] > 0){
            var name = "box" + chord.trueStrings[i];
            var box = document.getElementById(name);
            
            var widthString = box.getAttribute("width");
            var widthPx = parseInt(widthString) / 2;
            
            var xString = box.getAttribute("x");
            var xPx = parseInt(xString);
            
            var xPos = widthPx + xPx;
            
            var dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

            dot.setAttribute("class","bigDot");
            dot.setAttribute("r","10");
            dot.setAttribute("stroke","none");
            dot.setAttribute("fill","white");
            dot.setAttribute("cx",xPos);
            dot.setAttribute("cy",bigBoxY[i]);
            
            if(i == chord.rootString){
                dot.setAttribute("fill","#5816f9");
            }
            
            svg.appendChild(dot);
        }
        else {
            var cross = document.createElementNS("http://www.w3.org/2000/svg", 'text');

            cross.textContent = "X";
            cross.setAttribute("class","bigCross");
            cross.setAttribute("x","-10px");
            cross.setAttribute("y",bigBoxY[i] + 9);
            svg.appendChild(cross);
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function regenerateChord(e) {
    var parentid = e.parentNode.parentNode.id;
    console.log(parentid);
    var thenum = parentid.replace( /^\D+/g, '');
    console.log(thenum);
    var chord = chordArray[thenum];
    
    var target = "drawBox" + thenum;
    console.log(target);
    var drawbox = document.getElementById(target);
    console.log(drawbox);
    drawbox.innerHTML = '';
    
    generateChord(chord);
    renderSymbols(chord);
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}