'use strict';

//band list array
var bandList = [
    "RAMONES",
    "DEAD KENNEDYS",
    "SEX PISTOLS",
    "NEW YORK DOLLS",
    "GREEN DAY",
    "MINOR THREAT",
    "PENNYWISE",
    "CIRCLE JERKS",
    "BLACK FLAG",
    "MISFITS",
    "THE CRAMPS",
    "BAD BRAINS",
    "THE VANDALS",
    "BAD RELIGION",
];

const lives = 7;           // Maximum number of guesses remaining

var guessedLetters = [];   // letters guessed
var bandIndex;             // Index of the current band in the bandList array
var bandGuess = [];        // the band name that is being played
var livesLeft = 0;         // lives/quesses the player has left
var gameStart = false;     // trigger for "press any key to start/restart"
var gameOver = false;      // trigger for "press any key to start/restart"     
var points = 0;            // How many times the player has won

/*------------------------------------------------------------------*/

/* ADD Game sounds*/


// Reset our game-level variables
function resetGame() {
    livesLeft = lives;
    gameStart = false;

// Use Math.floor to round the random number down to the nearest whole.
    bandIndex = Math.floor(Math.random() * (bandList.length));

// Clear out bandGuess and guessedLetters arrays
    guessedLetters = [];
    bandGuess = [];

/*Clear hangman image
document.getElementById("hangmanImage").src = "";*/

// Build bandGuess and clear it 
    for (var i = 0; i < bandList[bandIndex].length; i++) {
        bandGuess.push("_");
    }   

// Hide press any key, game over, and win images/text
    document.getElementById("pressAnykey").style.cssText = "display: none";
    document.getElementById("youSuck").style.cssText = "display: none";
    document.getElementById("winning").style.cssText = "display: none";

    // Show display
    updateDisplay();
};
/* --------------------------------------------------------------------- */

//  Updates the display
function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentBand").innerText = "";
    for (var i = 0; i < bandGuess.length; i++) {
    document.getElementById("currentBand").innerText += bandGuess[i];
    }
    
    document.getElementById("livesLeft").innerText = livesLeft;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(livesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressAnyKey").style.cssText = "display:block";
        gameOver = true;
    }
};

/* --------------------------------------------------------------------- */

// Updates the image depending on how many guesses
function updateHangmanPic() {
    document.getElementById("hangmanPic").src = "assets/images/" + (lives - livesLeft) + ".png";
};

/* --------------------------------------------------------------------- */

document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(gameOver) {
        resetGame();
        gameOver = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};
/* --------------------------------------------------------------------- */

function makeGuess(letter) {
    if (livesLeft > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        // Prevent using the same letter
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
};
/* --------------------------------------------------------------------- */

// Finds all instances the letter appears 
// string and replaces them in the band name.
function checkGuess(letter) {

// Array to save the position of the letters
    var positions = [];
    for (var i = 0; i < bandList[bandIndex].length; i++) {
        if(bandList[bandIndex][i] === letter) {
            positions.push(i);
        }
    }

// if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        livesLeft--;
        updateHangmanPic();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            bandGuess[positions[i]] = letter;
        }
    }
};
/* --------------------------------------------------------------------- */

// Checks for a win by seeing if there are any remaining underscores in the bandGuess we are building.
function checkWin() {
    if(bandGuess.indexOf("_") === -1) {
        document.getElementById("winning").style.cssText = "display: block";
        document.getElementById("pressAnyKey").style.cssText= "display: block";
        wins++;
        startOver = true;
    }
};
/* --------------------------------------------------------------------- */

// Checks for a loss
function checkLoss()
{
    if(livesLeft <= 0) {
        document.getElementById("youSuck").style.cssText = "display: block";
        document.getElementById("pressAnyKey").style.cssText = "display:block";
        startOver = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (livesLeft > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    }
    
};

// Event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(startOver) {
        resetGame();
        startOver = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            /*keySound.play();*/
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};


