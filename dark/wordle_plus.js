import { words } from "../words.js";

const keyboard = document.querySelector('.key-container');
document.getElementById("streak-button").addEventListener("click", myFunction);
//document.getElementById("shuffle-button").addEventListener("click", shuffleFunction);
document.getElementById("tries-button").addEventListener("click", triesFunction);
var score = 0;
var numberTries = 0;
//function shuffleFunction() {
    //console.log("shuffle function clicked!");
    //console.log(numberTries);
    //console.log(score);
    //start();
//}
function triesFunction() {
    console.log("tries function clicked!");
    document.getElementById("tries-button").innerHTML = "Total Tries: " + numberTries;
    //start();
}
function myFunction() {
    console.log("clicked!");
    document.getElementById("streak-button").innerHTML = "Current Points: " + score;
}
window.addEventListener("load", (event) => {
    console.log("Welcome to Wordle Plus!");
});

document.querySelector('.dropdown-menu').addEventListener('click', function(event) {
    event.stopPropagation();
 });

const allKeys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
];

var userWord = "";
const clickEvent = (key, color) => {
    document.getElementById(key).style.backgroundColor = color;
};

allKeys.forEach(key => {
    const createButton = document.createElement('button');
    createButton.textContent = key;
    createButton.setAttribute('id', key);
    createButton.addEventListener('click', () => clickEvent(key, '#272729'));
    createButton.disabled = true;
    keyboard.append(createButton);
});

// Total number of guesses
var guesses = 6; 
//length of word
var wordLength = 5;

//present index -- player's current posotion
var row = 0;
var col = 0;

var gameOver = false;
var word = words[Math.floor(Math.random() * words.length)];

window.onload = function() {
    start();
}

var coloredKeys = [];
 // add animations

function start() {
    // Initialize the gameboard
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    let guess = [];
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
                    console.log(key.code[3]);
                    currTile.innerText = key.code[3];
                    userWord += currTile.innerText;
                    if (!coloredKeys.includes(key.code[3])) {
                        clickEvent(key.code[3], '#272729');
                    }
                    guess.push(key.code[3]);
                    col++;
                }
            }
        } else if (key.code == "Backspace" && col != 0) {
            if (col > 0 && col <= wordLength) {
                col--;
            }
            guess.pop();
            let letter = userWord[userWord.length-1];
            if (guess.includes(letter) == false) {
                clickEvent(letter, "#EDEDF4");
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
            userWord = userWord.substring(0, userWord.length - 1);   

        } else if (key.code == "Enter") {
            if (words.includes(userWord.toLowerCase())) {
                numberTries++;
                update();
                userWord = "";
                row += 1;
                col = 0;
            }
            else {
                showMessage("You entered an invalid word", 1);
            }
        }
        if (!gameOver && row == guesses) {
            gameOver = true;
            var newMessage = "You Lose! The correct word is: " + word;
            showMessage(newMessage, 3);
        }
    })
}

function update() {
    let correct = 0;
    const animateDuration = 750;
    for (let i = 0; i < wordLength; i++) {
        let tile = document.getElementById(row.toString() + "-" + i.toString());
        let letter = tile.innerText;
        setTimeout(() => {
            if (word[i].toUpperCase() == letter) {
                tile.classList.add("answer-correct");
                clickEvent(letter, "#5DF88E");
                coloredKeys.push(letter);
                score++;
                correct++;
                if (correct == wordLength) {
                    gameOver = true;
                    showMessage("You Win!", 2);
                    document.getElementById("playAgain").style.visibility = "visible";
                }
                
            } else if (word.toUpperCase().includes(letter)) {
                tile.classList.add("partially-correct");
                coloredKeys.push(letter);
                clickEvent(letter, "#FF6201");
            } else {
                tile.classList.add("incorrect");
            }
        }, (i * animateDuration) / 2);
        tile.classList.add('animate');
        tile.style.animationDelay = `${(i * animateDuration) / 2}ms`;
    }
}
const showMessage = (message, index) => {
    console.log("Here");
    var ptag = document.getElementById('par1');
    ptag.innerHTML = message;
    ptag.style.visibility = "visible";
    if (index === 1) {
        setTimeout(function() {
            ptag.style.visibility = "hidden";
        }, 1200);
    }
}
