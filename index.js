"use strict";

// variables to generate the base HTML
let header = document.createElement("header");
let gameDiv = document.createElement("div");
let displayHangmanDiv = document.createElement("div");
let displayWordDiv = document.createElement("div");
let displayKeyboardDiv = document.createElement("div");
let settingsDiv = document.createElement("div");
let wordTryButton = document.createElement("button");
let wordTryInputDiv = document.createElement("div");
let wordTryInputField = document.createElement("input");
let wordTryInputSubmit = document.createElement("button");
let replayGameButton = document.createElement("button"); // hide it when game status is fresh or ongoing
let addWordButton = document.createElement("button"); // hide it when game status is fresh or ongoing

// variables to handle JS game logic
const Status = {
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
let gameStatus = Status.Fresh;

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
wordTryButton.textContent = "Proposer un mot";
replayGameButton.textContent = "Rejouer";
addWordButton.textContent = "Ajouter un mot";
wordTryInputField.setAttribute("type", "text");
wordTryInputSubmit.setAttribute("type", "submit");
wordTryInputSubmit.textContent = "Ajouter";
settingsDiv.appendChild(wordTryButton);
wordTryInputDiv.appendChild(wordTryInputField);
wordTryInputDiv.appendChild(wordTryInputSubmit);
settingsDiv.appendChild(wordTryInputDiv);
settingsDiv.appendChild(document.createElement("br"));
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

function initSettings() {
  wordTryInputField.style.display = "none";
  wordTryInputSubmit.style.display = "none";
}

// inits all the elements of the game
function initGame() {
  gameStatus = Status.Ongoing;
  initSettings();
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
  displayWordDiv.textContent = displayedWordArray.join("");
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
    "lettres manquantes : " +
      emptyLettersLeft +
      ", essais restants : " +
      triesLeft
  );
  if (emptyLettersLeft == 0) {
    gameStatus = Status.Success;
    gameOver();
  }
  if (triesLeft == 0) {
    gameStatus = Status.Defeat;
    gameOver();
  }
}

function gameOver() {
  displayEndGameMessage();
  playAgain();
}

function displayEndGameMessage() {
  let message;
  if (gameStatus == Status.Success) {
    message = "Félicitations ! Vous avez gagné ! Voulez-vous rejouer ?";
  } else if (gameStatus == Status.Defeat) {
    message = "Dommage, vous avez perdu =( Voulez-vous rejouer ?";
  }
  alert(message);
  // make a new div to display an end game message based on gameStatut
}

function playAgain() {
  // add button, on click we rebuild the game board
}

function isLetter(letter) {
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] == letter) {
      return true;
    }
  }
  return false;
}

function handleWordTry(word) {
  console.log("letter " + word);
}

// handle a letter being clicked through the displayed keyboard
displayKeyboardDiv.addEventListener("click", (e) => {
  let letterClicked = e.target;
  letterClicked.classList.add("tried"); // disable the button and grey out the CSS
  letterClicked.disabled = true;
  updateGameScreen(letterClicked.id);
});

// handle a letter being typed through the user's physical keyboard
document.addEventListener("keyup", (e) => {
  if (document.activeElement != wordTryInputField && isLetter(e.key)) {
    let letterClicked = document.querySelector("#" + e.key);
    letterClicked.classList.add("tried"); // disable the button and grey out the CSS
    letterClicked.disabled = true;
    updateGameScreen(letterClicked.id);
  }
});

// handle the user wanting to submit a word
wordTryButton.addEventListener("click", (e) => {
  if (!wordTryInputDiv.hidden) {
    wordTryInputDiv.style.display = "block";
  }
});

wordTryInputSubmit.addEventListener("click", (e) => {
  console.log(wordTryInputField.value);
});

// main logic "loop"
initGame();
