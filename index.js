"use strict";

// variables to generate the base HTML
let header = document.createElement("header");
let hangmanDiv = document.createElement("div");
let hangmanCanvas = document.createElement("canvas");
let gameDiv = document.createElement("div");
let displayWordDiv = document.createElement("div");
let displayKeyboardDiv = document.createElement("div");
let listOfTriesDiv = document.createElement("div");
let listOfWordsTriedDiv = document.createElement("div");
// let listOfLettersTriedDiv = document.createElement("div");
let settingsDiv = document.createElement("div");
let wordTryButton = document.createElement("button");
let wordTryInputDiv = document.createElement("div");
let wordTryInputField = document.createElement("input");
let wordTryInputSubmit = document.createElement("button");
let endGameMessageDiv = document.createElement("div");
let replayGameButton = document.createElement("button");
let addWordButton = document.createElement("button");
let addWordInputDiv = document.createElement("div");
let addWordInputField = document.createElement("input");
let addWordInputSubmit = document.createElement("button");
let clearCookiesButton = document.createElement("button");

// variables to handle JS game logic
const Status = {
  // fresh before first game, ongoing during a game, success on win, defeat on game over
  Fresh: "fresh",
  Ongoing: "ongoing",
  Success: "success",
  Defeat: "defeat",
};
const alphabetArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const alphabetString = "abcdefghijklmnopqrstuvwxyz";
let wordList = [
  "abondance",
  "ananas",
  "artichaut",
  "asperge",
  "aubergine",
  "avocat",
  "betterave",
  "brocoli",
  "cacahuète",
  "camembert",
  "canneberge",
  "cannelle",
  "carotte",
  "cerise",
  "champignon",
  "chataigne",
  "citrouille",
  "clementine",
  "concombre",
  "coriandre",
  "courgette",
  "curcuma",
  "endive",
  "epinard",
  "fenouil",
  "fraise",
  "framboise",
  "gingembre",
  "goyave",
  "grenade",
  "groseille",
  "haricot",
  "laitue",
  "mandarine",
  "mirabelle",
  "moutarde",
  "nectarine",
  "oignon",
  "orange",
  "pamplemousse",
  "paprika",
  "pastèque",
  "piment",
  "pistache",
  "poireau",
  "poivron",
  "potimarron",
  "potiron",
  "pruneau",
  "raclette",
  "rhubarbe",
  "roquette",
  "rutabaga",
  "salade",
  "tomate",
  "topinambour",
  "vanille",
];
let TOTAL_TRIES = 10;
let wordToGuess = "";
let lettersGuessed = [];
let wordsGuessed = [];
let displayedWord = "";
let displayedWordArray = [];
let triesLeft = TOTAL_TRIES;
let emptyLettersLeft = 0;
let gameStatus = Status.Fresh;
let wordsAddedByUser = [];

// header
header.textContent = "header";
document.body.appendChild(header);

// hangman drawing zone
hangmanCanvas.id = "hangman";
hangmanDiv.appendChild(hangmanCanvas);
hangmanDiv.id = "hangmanDiv";
document.body.appendChild(hangmanDiv);

// game zone
gameDiv.id = "game";
gameDiv.classList.add("container");
displayWordDiv.id = "displayed-word";
displayWordDiv.classList.add("centered");
gameDiv.appendChild(displayWordDiv);
displayKeyboardDiv.id = "displayed-keyboard";
displayKeyboardDiv.classList.add("centered");
gameDiv.appendChild(displayKeyboardDiv);
// listOfLettersTriedDiv.textContent = "Liste des lettres essayées : ";
listOfWordsTriedDiv.textContent = "";
listOfWordsTriedDiv.style.textDecoration = "line-through";
listOfWordsTriedDiv.style.justifyContent = "center";
// listOfTriesDiv.appendCnild(listOfLettersTriedDiv);
listOfTriesDiv.appendChild(listOfWordsTriedDiv);
gameDiv.appendChild(listOfTriesDiv);
document.body.appendChild(gameDiv);
wordTryButton.textContent = "Proposer un mot";
wordTryButton.id = "word-try";
wordTryButton.classList.add("centered");
wordTryInputField.setAttribute("type", "text");
wordTryInputSubmit.setAttribute("type", "submit");
wordTryInputSubmit.textContent = "Ajouter";
wordTryInputDiv.appendChild(wordTryInputField);
wordTryInputDiv.appendChild(wordTryInputSubmit);
wordTryInputDiv.id = "word-try-input";
wordTryInputDiv.classList.add("centered");
gameDiv.appendChild(wordTryButton);
gameDiv.appendChild(wordTryInputDiv);

// settings zone
settingsDiv.id = "settings";
settingsDiv.classList.add("container");
endGameMessageDiv.id = "end-game-message";
endGameMessageDiv.classList.add("centered");
settingsDiv.appendChild(endGameMessageDiv);
replayGameButton.id = "replay-game-button";
replayGameButton.classList.add("centered");
replayGameButton.textContent = "Rejouer";
settingsDiv.appendChild(replayGameButton);
addWordButton.id = "add-word-button";
addWordButton.classList.add("centered");
addWordButton.textContent = "Ajouter un mot";
addWordInputField.setAttribute("type", "text");
addWordInputSubmit.setAttribute("type", "submit");
addWordInputSubmit.textContent = "Ajouter";
settingsDiv.appendChild(addWordButton);
addWordInputDiv.classList.add("centered");
addWordInputDiv.appendChild(addWordInputField);
addWordInputDiv.appendChild(addWordInputSubmit);
settingsDiv.appendChild(addWordInputDiv);
clearCookiesButton.id = "clear-cookies";
clearCookiesButton.classList.add("centered");
clearCookiesButton.textContent = "Vider les cookies";
settingsDiv.appendChild(clearCookiesButton);
document.body.appendChild(settingsDiv);

// canvas management functions for drawing the hangman
/** @type {HTMLCanvasElement} */
function initCanvas() {
  // let hangmanContext = hangmanCanvas.getContext("2d");

  hangmanContext.beginPath();
  hangmanContext.fillStyle = "#ffffff";
  hangmanContext.lineWidth = 2;
}

// function resetCanvas() {
//   let hangmanContext = hangmanCanvas.getContext("2d");
//   hangmanContext.clearRect(0, 0, 400, 400);
// }

function draw(startX, startY, endX, endY) {
  // let hangmanContext = hangmanCanvas.getContext("2d");
  hangmanContext.beginPath();
  hangmanContext.moveTo(startX, startY);
  hangmanContext.lineTo(endX, endY);
  hangmanContext.stroke();
}

const base1 = function () {
  console.log("drawing base1");
  draw(0, 150, 150, 150);
};

const base2 = function () {
  console.log("drawing base2");
  draw(10, 0, 10, 600);
};

const base3 = function () {
  console.log("drawing base3");
  draw(0, 5, 70, 5);
};

const base4 = function () {
  console.log("drawing base4");
  draw(60, 5, 60, 15);
};
const head = function () {
  // let hangmanContext = hangmanCanvas.getContext("2d");
  hangmanContext.beginPath();
  hangmanContext.arc(60, 25, 10, 0, Math.PI * 2, false);
  hangmanContext.stroke();
};

const torso = function () {
  console.log("drawing torso");
  draw(60, 36, 60, 70);
};

const rightArm = function () {
  console.log("drawing right arm");
  draw(60, 46, 100, 50);
};

const leftArm = function () {
  console.log("drawing left arm");
  draw(60, 46, 20, 50);
};

const rightLeg = function () {
  console.log("drawing right leg");
  draw(60, 70, 100, 100);
};

const leftLeg = function () {
  console.log("drawing left leg");
  draw(60, 70, 20, 100);
};

// const drawArray = [
//   base1,
//   base2,
//   base3,
//   base4,
//   head,
//   torso,
//   leftArm,
//   rightArm,
//   leftLeg,
//   rightLeg,
// ];

const drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  base4,
  base3,
  base2,
  base1,
];

// checks for duplicate in array, if not adds the element to it
function addNoDuplicate(arr, el) {
  if (!arr.includes(el)) {
    arr.push(el);
    return true;
  }
  return false;
}

// build the game keyboard
function buildKeyboard() {
  for (var i = 0; i < 26; i++) {
    let button = document.createElement("button");
    button.classList.add("letter-button");
    button.id = alphabetString[i];
    button.textContent = alphabetString[i];
    displayKeyboardDiv.appendChild(button);
  }
}

// init the settings to display
function initSettings() {
  wordTryButton.style.display = "block";
  wordTryInputDiv.style.display = "none";
  addWordButton.style.display = "block";
  addWordInputDiv.style.display = "none";

  // get words from user's cookies
  let cookies = document.cookie;
  if (cookies.match(/^(.*;)?\s*words\s*=\s*[^;]+(.*)?$/)) {
    cookies = cookies.slice(6); // if cookies exist, remove "words=" in front
    wordsAddedByUser = cookies.split(",");
    wordList = [...wordList, ...wordsAddedByUser];
  }
}

// inits all the elements of the game
function initGame() {
  gameStatus = Status.Ongoing;
  initCanvas();
  initSettings();
  getRandomWord();
  initWordArray();
  displayWord();
  buildKeyboard();
}

// gets a random word from the pool
function getRandomWord() {
  wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
}

// creates an "empty" array for the letters to be tried
function initWordArray() {
  let wordLength = wordToGuess.length;
  for (let i = 0; i < wordLength; i++) {
    displayedWordArray[i] = "_";
    emptyLettersLeft++;
  }
}

// displays the current word with the missing letters
function displayWord() {
  displayWordDiv.textContent = displayedWordArray.join(" ").toUpperCase();
}

// updates the game screen at each user input
function updateGameScreen(letter) {
  letter.classList.add("tried"); // grey out the CSS
  letter.disabled = true; // disable button
  if (addNoDuplicate(lettersGuessed, letter.id)) {
    // add the letter input to the list of letters already tried
    updateWordArray(letter.id);
  }
  // listOfLettersTriedDiv.textContent = "Liste des lettres essayées : " + lettersGuessed;
  displayWord();
  updateDrawing();
  checkGameStatus();
}

// updates the word with the letters tried so far
function updateWordArray(letter) {
  let wordLength = wordToGuess.length;
  let letterFound = false;

  for (let i = 0; i < wordLength; i++) {
    if (wordToGuess[i] == letter) {
      displayedWordArray[i] = letter;
      letterFound = true;
    }
  }
  if (letterFound == false) {
    triesLeft--;
  }
}

function updateDrawing() {
  for (let i = TOTAL_TRIES; i > triesLeft; i--) {
    drawArray[i - 1]();
  }
}

// checks if the word is guessed or if the hangman is dead
function checkGameStatus() {
  emptyLettersLeft = 0;

  for (let i = 0; i < displayedWordArray.length; i++) {
    if (displayedWordArray[i] == "_") emptyLettersLeft++;
  }
  if (emptyLettersLeft == 0) {
    gameStatus = Status.Success;
    gameOver();
  }
  if (triesLeft == 0) {
    gameStatus = Status.Defeat;
    updateDrawing();
    gameOver();
  }
}

function gameOver() {
  displayWordDiv.textContent = wordToGuess;
  displayWord();
  displayEndGameMessage();
}

function displayEndGameMessage() {
  displayWord();
  let message;
  if (gameStatus == Status.Success) {
    message = "Félicitations ! Vous avez gagné !";
  } else if (gameStatus == Status.Defeat) {
    message = "Dommage, vous avez perdu =(";
  }
  endGameMessageDiv.textContent = message;
  endGameMessageDiv.style.display = "block";
}

function purgeGameData() {
  displayedWordArray.length = 0;
  triesLeft = TOTAL_TRIES;
  emptyLettersLeft = 0;
  lettersGuessed = [];
  wordsGuessed = [];
  gameStatus = Status.Ongoing;
  // listOfLettersTriedDiv.textContent = "Liste des lettres essayées : ";
  listOfWordsTriedDiv.textContent = "";
}

// reactivate every disabled keys
function refreshKeyboard() {
  const letters = document.querySelectorAll(".tried");
  letters.forEach((letter) => {
    letter.classList.remove("tried");
    letter.disabled = false;
  });
}

function playAgain() {
  purgeGameData();
  resetCanvas();
  initSettings();
  getRandomWord();
  initWordArray();
  displayWord();
  refreshKeyboard();
}

function handleWordTry(wordGuessed) {
  if (wordGuessed == wordToGuess) {
    gameStatus = Status.Success;
    gameOver();
  } else {
    if (addNoDuplicate(wordsGuessed, wordGuessed)) {
      // add the attempt to the list of words already tried
      triesLeft--;
    }
    listOfWordsTriedDiv.textContent = wordsGuessed.join(" ").toUpperCase();
    checkGameStatus();
  }
}

// handle word try unless the field is empty
function handleWordInput() {
  if (wordTryInputField.value != "") {
    handleWordTry(wordTryInputField.value.toLowerCase());
    wordTryInputField.value = "";
  }
}

function addWordToDictionary(newWord) {
  if (!wordList.includes(newWord)) {
    wordsAddedByUser.push(newWord);
    wordList.push(newWord);
    document.cookie = "words=" + wordsAddedByUser;
  }
}

// handle new word submission to dictionary unless the field is empty or word too short
function handleWordSubmission() {
  if (addWordInputField.value.length > 5) {
    addWordToDictionary(addWordInputField.value);
    addWordInputField.value = "";
  }
}

// Event listeners

// handle a letter being clicked through the displayed keyboard
displayKeyboardDiv.addEventListener("click", (e) => {
  if (gameStatus == Status.Ongoing && e.target.nodeName == "BUTTON") {
    let letterClicked = e.target;
    updateGameScreen(letterClicked);
  }
});

// handle a letter being typed through the user's physical keyboard
document.addEventListener("keyup", (e) => {
  if (gameStatus == Status.Ongoing) {
    if (
      document.activeElement != wordTryInputField &&
      document.activeElement != addWordInputField &&
      alphabetString.includes(e.key)
    ) {
      // if focus isn't on the textfields and if input is a letter
      let letterClicked = document.querySelector("#" + e.key);
      updateGameScreen(letterClicked);
    }
  }
});

// handle the user wanting to submit a word
wordTryButton.addEventListener("click", () => {
  if (gameStatus == Status.Ongoing) {
    if (!wordTryInputDiv.hidden) {
      wordTryInputDiv.style.display = "block";
      wordTryButton.style.display = "none";
    }
    wordTryInputField.focus();
  }
});

// handle the user pressing enter after writing a word
wordTryInputField.addEventListener("keyup", (e) => {
  if (gameStatus == Status.Ongoing) {
    if (e.key === "Enter") {
      handleWordInput();
    }
  }
});

// handle the user clicking on the submit button to try a word
wordTryInputSubmit.addEventListener("click", () => {
  if (gameStatus == Status.Ongoing) {
    handleWordInput();
  }
});

// handle the replay button
replayGameButton.addEventListener("click", () => {
  playAgain();
});

// handle the user wanting to add a word to dictionary
addWordButton.addEventListener("click", () => {
  if (!addWordInputDiv.hidden) {
    addWordInputDiv.style.display = "block";
    addWordButton.style.display = "none";
  }
  addWordInputField.focus();
});

// handle the user pressing enter after writing a word
addWordInputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleWordSubmission();
  }
});

// handle the user clicking on the submit button to try a word
addWordInputSubmit.addEventListener("click", () => {
  handleWordSubmission();
});

// handle the user emptying the cookies
clearCookiesButton.addEventListener("click", () => {
  document.cookie = "words=";
});

// main logic "loop"
let hangmanContext = hangmanCanvas.getContext("2d");

initGame();

// TO DO
// improve game settings
// add word pool API
// add selection of word pools to merge together
// add language management in settings
// add dark mode
