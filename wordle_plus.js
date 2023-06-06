// Total number of guesses
var guesses = 6; 
//length of word
var wordLength = 5;

//present index -- player's current posotion
var row = 0;
var col = 0;

var gameOver = false;
var word = "audio";

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

    // Listen for Key Press
    document.addEventListener("keyup", (key) => {
        if (gameOver) {
            return ;
        }
        if ("KeyA" <= key.code && key.code <= "KeyZ") {
            if (col < wordLength) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = key.code[3];
                    col++;
                }
            }
        } else if (key.code == "Backspace") {
            if (col > 0 && col <= wordLength) {
                col--;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";    

        } else if (key.code == "Enter") {
            update();
            //start a new row
            row += 1;
            col = 0;
        }
        if (!gameOver && row == guesses) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let i = 0; i < wordLength; i++) {
        let tile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = tile.innerText;
        
        if (word[i].toUpperCase() == letter) {
            tile.classList.add("answer-correct");
            correct++;
        } else if (word.toUpperCase().includes(letter)) {
            tile.classList.add("partially-correct");
        } else {
            tile.classList.add("incorrect");
        }

        if (correct == wordLength) {
            gameOver = true;
        }
    }
}