import { words } from "./words.js";

const modal = document.querySelector('#modal');
const closeDialog = document.querySelector('.close-button');



// Total number of guesses
var guesses = 6; 
//length of word
var wordLength = 5;

//present index -- player's current posotion
var row = 0;
var col = 0;

var gameOver = false;
var word = words[Math.floor(Math.random() * words.length)];
console.log(word)
 

window.onload = function() {
    start();
}
 // add animations
function start() {
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
    var userWord = "";
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
                    userWord += currTile.innerText;
                    col++;
                }
            }
        } else if (key.code == "Backspace") {
            if (col > 0 && col <= wordLength) {
                col--;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
            userWord = userWord.substring(0, userWord.length - 1);   

        } else if (key.code == "Enter") {
            console.log(userWord.toLowerCase());
            if (words.includes(userWord.toLowerCase())) {
                update();
                userWord = "";
                row += 1;
                col = 0;
            }
            else {
                modal.showModal();
                closeDialog.addEventListener('click', () => {
                    modal.close();
                })
                //make better
                //window.alert("You entered an incorrect word");
            }
            //start a new row
            
        }
        if (!gameOver && row == guesses) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    const animateDuration = 750;
    let correct = 0;
    for (let i = 0; i < wordLength; i++) {
        let tile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = tile.innerText;
        
        setTimeout(() => {
            if (word[i].toUpperCase() == letter) {
                tile.classList.add("answer-correct");
                correct++;
            } else if (word.toUpperCase().includes(letter)) {
                tile.classList.add("partially-correct");
            } else {
                tile.classList.add("incorrect");
            }
        }, (i * animateDuration) / 2);

        tile.classList.add('animate');
        tile.style.animationDelay = `${(i * animateDuration) / 2}ms`

        setTimeout(() => {
            if (correct == wordLength) {
                gameOver = true;
                window.alert("Congrats");
            }
        }), 3 * animateDuration;

    }
}