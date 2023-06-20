import { words } from "../words.js";

const keyboard = document.querySelector('.key-container');

document.getElementById("streak-button").addEventListener("click", myFunction);
document.getElementById("tries-button").addEventListener("click", triesFunction);
document.getElementById("dark-mode-toggle").addEventListener("click", darkModeFunction);
document.getElementById("custom_dictionary").addEventListener("click", customFunction);
var score = 0;
var numberTries = 0;
var totalLettersIncorrect = [];
var coloredKeys = [];
var toggleClicked = false;
var customToggle = false;
var wordsArr = [];
var word = "";

function customFunction() {
    if (customToggle === false) {
        customToggle = true;
        document.getElementById('custom_words').style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    }
    else {
        customToggle = false;
        document.getElementById('custom_words').style.display = "none";
    }
    customWords();
}
function customWords() {
    var input = document.getElementById("textArea");
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log(document.getElementById('textArea').value);
        var tmpWords = document.getElementById("textArea").value.split(/[,.\s]/);
        for (let i = 0; i < tmpWords.length; i++) {
            if (tmpWords[i].length === 5 && words.includes(tmpWords[i].toLowerCase()) === true) {
                wordsArr.push(tmpWords[i]);
            }
        }
        showMessage("Word entered. Please press custom dictionary button to start playing!", 1);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    });
    if (wordsArr.length === 0) {
        showMessage("Invalid words entered. Word has been chosen automatically", 1);
        word = words[Math.floor(Math.random() * words.length)];
    }
    else {
        word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    }
    console.log("new word: " + word);
}

function darkModeFunction() {
    if (toggleClicked === false) {
        toggleClicked = true;
    }
    else {
        toggleClicked = false;
    }
    document.body.classList.toggle("light-theme");
    for (let i = 0; i < totalLettersIncorrect.length; i++) {
        if (toggleClicked === true) {
            if (!coloredKeys.includes(totalLettersIncorrect[i])) {
                clickEvent(totalLettersIncorrect[i], '#BCB8B1');
            }
        }
        else {
            if (!coloredKeys.includes(totalLettersIncorrect[i])) {
                clickEvent(totalLettersIncorrect[i], '#272729');
            }
        }
    }
}
function triesFunction() {
    document.getElementById("tries-button").innerHTML = "Total Tries: " + numberTries;
}
function myFunction() {
    document.getElementById("streak-button").innerHTML = "Current Points: " + score;
}
window.addEventListener("load", (event) => {
    showMessage("Welcome to Wordle Plus!", 1);
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

if (wordsArr.length === 0) {
    word = words[Math.floor(Math.random() * words.length)];
}
else {
    word = wordsArr[Math.floor(Math.random() * wordsArr.length)];
}
console.log(word);
//present index -- player's current posotion
var row = 0;
var col = 0;

var gameOver = false;

window.onload = function() {
    start();
}
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
        if (customToggle === false) {
            if (gameOver) {
                return ;
            }
            if ("KeyA" <= key.code && key.code <= "KeyZ") {
                if (col < wordLength) {
                    let currTile = document.getElementById(row.toString() + "-" + col.toString());
                    if (currTile.innerText == "") {
                        currTile.innerText = key.code[3];
                        userWord += currTile.innerText;
                        if (!coloredKeys.includes(key.code[3])) {
                            if (toggleClicked === false) { 
                                clickEvent(key.code[3], '#272729');
                            } else {
                                clickEvent(key.code[3], '#698996');
                            }
                            totalLettersIncorrect.push(key.code[3]);
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
                    if (row + 1 === guesses) {
                        userWord = "";
                        row += 1;
                        col = 0;
                    }
                    else {
                        setTimeout(function() {
                            userWord = "";
                            row += 1;
                            col = 0;
                        }, 1800);
                    }
                    setTimeout(function() {
                        if (!gameOver && row == guesses) {
                            console.log("here");
                            gameOver = true;
                            var newMessage = "You Lose! The correct word is: " + word;
                            showMessage(newMessage, 3);
                            setTimeout(function() {
                                document.getElementById("playAgain").style.visibility = "visible";
                            }, 1200);
                        }
                    }, 1800);
                }
                else {
                    showMessage("You entered an invalid word", 1);
                }
            }
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
                    setTimeout(function() {
                        document.getElementById("playAgain").style.visibility = "visible";
                    }, 1200);
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
        }, 2000);
    }
}
