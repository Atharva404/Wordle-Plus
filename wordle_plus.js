// Total number of guesses
var guesses = 6; 
//length of word
var wordLength = 5;

//present index -- player's current posotion
var row = 0;
var col = 0;

var gameOver = false;
var word = "SQUID"

window.onload = function() {
    initialize();
}

function initialize() {
    // Initialize the gameboard
    for (let i = 0; i < guesses; i++) {
        for (let j = 0; j < wordLength; j++) {
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile-box");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}