var parts = ["cpu", "northbridge", "ram", "ssd", "cdrom", "sodimm", "pci", "gpu", "vram", "southbridge", "ide", "sata", "powersupply", "motherboard"]
var pastParts = [];
var round = 0;
var correct = [];
var incorrect = [];
var guessCount = 13;
var wins = 0;
var prevWord = ('');
var key = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function roundCataloging() {
    for (i = 0; i < parts.length;) {
        var roundWords = parts[Math.floor(Math.random() * parts.length)];
        var wordIndex = pastParts.indexOf(roundWords);
        if (wordIndex > -1) {
            continue;
        } else {
            pastParts.push(roundWords);
            i++;
        }
    }
}

function roundWord(word) {
    var blanks = ("");
    correct = [];
    incorrect = [];
    var letters = word.split("");
    for (i = 0; i < letters.length; i++) {
        blanks += "_ ";
    }
    guessCount = 13;
    document.getElementById('previous-word').innerHTML = prevWord;
    document.getElementById('guess-number').innerHTML = guessCount;
    document.getElementById('display-word').innerHTML = blanks;
    document.getElementById('rem-letters').innerHTML = incorrect;
    letterPlay(letters);
}

function letterPlay(letters) {
    document.onkeyup = function (event) {
        var found = false;
        var guess = event.key.toUpperCase();
        var wordDisplay = ("");
        for (i = 0; i < letters.length; i++) {
            if (key.indexOf(guess) > -1) {
                if (guess === letters[i].toUpperCase()) {
                    wordDisplay += letters[i];
                    found = true;
                    inWord = true;
                } else if (correct.indexOf(letters[i].toUpperCase()) > -1) {
                    wordDisplay += letters[i];
                } else if (incorrect.indexOf(guess.toUpperCase()) > -1) {
                    return;
                } else {
                    wordDisplay += "_ ";
                    continue;
                }
            } else {
                return;
            }
        }
        guessCount--;
        if (found) {
            correct.push(guess);
        } else {
            incorrect.push(guess);
        }

        document.getElementById('guess-number').innerHTML = guessCount;
        document.getElementById('display-word').innerHTML = wordDisplay;
        document.getElementById('rem-letters').innerHTML = incorrect;
        if (guessCount < 1) {
            newRound();
        } else if (wordDisplay.indexOf("_ ") < 0) {
            wins++;
            newRound();
        }
    }
}


function newRound() {

    incorrect = [];
    correct = [];
    if (round < pastParts.length) {
        var word = pastParts[round];
        roundWord(word);
        document.getElementById('wins').innerHTML = wins;
        prevWord = word;
        round++;
    } else {
        document.getElementById('display-word').innerHTML = "Game Over";
    }
}

document.onkeyup = function (event) {
    roundCataloging();
    newRound();
}