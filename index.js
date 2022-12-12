"use strict";

// variables to generate the base HTML
let header = document.createElement("header");
let gameDiv = document.createElement("div");
let displayHangmanDiv = document.createElement("div");
let displayWordDiv = document.createElement("div");
let displayKeyboardDiv = document.createElement("div");
let settingsDiv = document.createElement("div");
let replayGameButton = document.createElement("button");
let addWordButton = document.createElement("button");

// variables to handle JS game logic
const Statuses = {
  // fresh before first game, ongoing during a game, success on win, defeat on game over
  Fresh: "fresh",
  Ongoing: "ongoing",
  Success: "success",
  Defeat: "defeat",
};
let word = "test";
let wordList = ["baguette", "frites"];
let lettersGuessed = [];
let displayedWord = "";
let displayedWordArray = [];
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let triesLeft = 7;
let emptyLettersLeft = 0;
let gameStatus = Statuses.Fresh;

// header
header.textContent = "header";
document.body.appendChild(header);

// game zone
gameDiv.classList.add("game");
gameDiv.appendChild(displayHangmanDiv);
gameDiv.appendChild(displayWordDiv);
gameDiv.appendChild(displayKeyboardDiv);
document.body.appendChild(gameDiv);

// settings zone
settingsDiv.classList.add("settings");
replayGameButton.textContent = "Rejouer";
addWordButton.textContent = "Ajouter un mot";
settingsDiv.appendChild(replayGameButton);
settingsDiv.appendChild(addWordButton);
document.body.appendChild(settingsDiv);

// build the game keyboard
function buildKeyboard() {
  for (var i = 0; i < 26; i++) {
    let button = document.createElement("button");
    button.classList.add("letter-button");
    button.id = alphabet[i];
    button.textContent = alphabet[i];
    displayKeyboardDiv.appendChild(button);
  }
}

// inits all the elements of the game
function initGame() {
  gameStatus = Statuses.Ongoing;
  getRandomWord();
  initWordArray();
  displayWord();
  buildKeyboard();
}

// gets a random word from the pool
function getRandomWord() {
  word = wordList[Math.floor(Math.random() * wordList.length)];
}

// creates an "empty" array for the letters to be tried
function initWordArray() {
  let wordLength = word.length;
  for (let i = 0; i < wordLength; i++) {
    displayedWordArray[i] = "_";
    emptyLettersLeft++;
  }
  console.log(
    "word array initialized : " +
      displayedWordArray +
      ", empty letters left : " +
      emptyLettersLeft
  );
}

// displays the current word with the missing letters
function displayWord() {
  displayWordDiv.textContent = displayedWordArray.join(""); // RegEx to find and remove every comma
}

// updates the game screen at each user input
function updateGameScreen(letter) {
  lettersGuessed.push(letter); // add the letter input to the list of letters already tried
  updateWordArray(letter);
  displayWord();
  checkGameStatus();
}

// updates the word with the letters tried so far
function updateWordArray(letter) {
  let wordLength = word.length;
  let letterFound = false;
  // for (let i = 0; i < wordLength; i++) {
  //   console.log("searching for letter : " + word[i]);
  //   if (lettersGuessed.includes(word[i])) {
  //     displayedWordArray[i] = word[i];
  //     letterFound = true;
  //     console.log("found !");
  //   } else {
  //     displayedWordArray[i] = "_";
  //     emptyLettersLeft++;
  //     console.log("not found");
  //   }
  // }
  // if (letterFound == false) {
  //   console.log("lettre pas trouvée");
  //   triesLeft--;
  // }

  for (let i = 0; i < wordLength; i++) {
    console.log("searching for letter : " + letter);
    if (word[i] == letter) {
      displayedWordArray[i] = letter;
      letterFound = true;
      console.log("found !");
    } else {
      // displayedWordArray[i] = "_";
      // emptyLettersLeft++;
      // console.log("not found");
    }
  }
  if (letterFound == false) {
    console.log("lettre pas trouvée");
    triesLeft--;
  }

  console.log("current status of guess : " + displayedWordArray);
}

// checks if the word is guessed or if the hangman is dead
function checkGameStatus() {
  emptyLettersLeft = 0;

  for (let i = 0; i < displayedWordArray.length; i++) {
    if (displayedWordArray[i] == "_") emptyLettersLeft++;
  }
  console.log(
    "empty letters left : " + emptyLettersLeft + ", tries left : " + triesLeft
  );
}

// main logic "loop"
initGame();

// handle a letter being clicked through the displayed keyboard
displayKeyboardDiv.addEventListener("click", (e) => {
  let letterClicked = e.target;
  letterClicked.classList.add("tried"); // disable the button and grey out the CSS
  letterClicked.disabled = true;
  updateGameScreen(letterClicked.id);
});
