import { words } from "./words.js";

// const modal = document.querySelector('#modal');
const keyboard = document.querySelector('.key-container');
//const closeDialog = document.querySelector('.close-button');
const messageDisplay = document.querySelector(".message-container");


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
console.log(word)
 

window.onload = function() {
    start();
}
 // add animations
function start() {
    // Initialize the gameboard
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
                    currTile.innerText = key.code[3];
                    userWord += currTile.innerText;
                    clickEvent(key.code[3], '#272729');
                    guess.push(key.code[3]);
                    col++;
                }
            }
        } else if (key.code == "Backspace") {
            if (col > 0 && col <= wordLength) {
                col--;
            }
            guess.pop();
            let letter = userWord[userWord.length-1];
            if (guess.includes(letter) == false) {
                clickEvent(letter, "#818384");
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
            userWord = userWord.substring(0, userWord.length - 1);   

        } else if (key.code == "Enter") {
            if (words.includes(userWord.toLowerCase())) {
                update();
                userWord = "";
                row += 1;
                col = 0;
            }
            else {
                showMessage("You entered an invalid word");
            }
        }
        if (!gameOver && row == guesses) {
            gameOver = true;
            document.getElementById("answer-2").innerText = word;
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
                clickEvent(letter, "#6AAA64");
                correct++;
                console.log("correct" + correct);
                console.log("wordLength: " + wordLength);
                if (correct == wordLength) {
                    gameOver = true;
                        //console.log("IN here again!!");
                    showMessage("You Win!");
                       // window.alert("Congrats");
                }
                
            } else if (word.toUpperCase().includes(letter)) {
                tile.classList.add("partially-correct");
                clickEvent(letter, "#C9B468");
            } else {
                tile.classList.add("incorrect");
            }
        }, (i * animateDuration) / 2);
        tile.classList.add('animate');
        tile.style.animationDelay = `${(i * animateDuration) / 2}ms`;
    }

}

const showMessage = (message) => {
    console.log("Here");
    const messageE = document.createElement('p');
    messageE.textContent = message;
    messageDisplay.append(messageE);
    if (message != "You Win!") {
        setTimeout(function() {
            messageE.style.visibility = 'hidden';
        }, 1200);
    }
}