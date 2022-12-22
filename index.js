"use strict";

// variables to generate the base HTML
let header = document.createElement("header");
let gameDiv = document.createElement("div");
let displayHangmanDiv = document.createElement("div");
let displayWordDiv = document.createElement("div");
let displayKeyboardDiv = document.createElement("div");
let listOfTriesDiv = document.createElement("div");
let listOfWordsTriedDiv = document.createElement("div");
let listOfLettersTriedDiv = document.createElement("div");
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
let wordToGuess = "test";
let wordList = ["baguette", "frites"];
let lettersGuessed = [];
let wordsGuessed = [];
let displayedWord = "";
let displayedWordArray = [];
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
listOfLettersTriedDiv.textContent = "Liste des lettres essayées : ";
listOfWordsTriedDiv.textContent = "Liste des mots essayés : ";
listOfTriesDiv.appendChild(listOfLettersTriedDiv);
listOfTriesDiv.appendChild(listOfWordsTriedDiv);
gameDiv.appendChild(listOfTriesDiv);
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

// check if string contains element
// function contains(str, el) {
//   for (var i = 0; i < str.length; i++) {
//     if (str[i] == el) {
//       return true;
//     }
//   }
//   return false;
// }

// checks for duplicate in array, if not adds the element to it
function addNoDuplicate(arr, el) {
  if (!arr.includes(el)) {
    arr.push(el);
    console.log("added " + el + " to " + arr);
    return true;
  }
  console.log("Duplicate detected ! " + el + " is already in " + arr);
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
  wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
}

// creates an "empty" array for the letters to be tried
function initWordArray() {
  let wordLength = wordToGuess.length;
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
  letter.classList.add("tried"); // grey out the CSS
  letter.disabled = true; // disable button
  if (addNoDuplicate(lettersGuessed, letter.id)) {
    // add the letter input to the list of letters already tried
    updateWordArray(letter.id);
  }
  listOfLettersTriedDiv.textContent =
    "Liste des lettres essayées : " + lettersGuessed;
  checkGameStatus();
}

// updates the word with the letters tried so far
function updateWordArray(letter) {
  let wordLength = wordToGuess.length;
  let letterFound = false;

  for (let i = 0; i < wordLength; i++) {
    console.log("searching for letter : " + letter);
    if (wordToGuess[i] == letter) {
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
  displayWordDiv.textContent = wordToGuess;
  displayWord();
  displayEndGameMessage();
  playAgain();
}

function displayEndGameMessage() {
  displayWord();
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

function handleWordTry(wordGuessed) {
  if (wordGuessed == wordToGuess) {
    gameStatus = Status.Success;
    gameOver();
  } else {
    // if (!contains(wordsGuessed, wordGuessed)) {
    //     wordsGuessed.push(wordGuessed);
    //}
    if (addNoDuplicate(wordsGuessed, wordGuessed)) {
      // add the attempt to the list of words already tried
      triesLeft--;
    }
    listOfWordsTriedDiv.textContent =
      "Liste des mots essayés : " + wordsGuessed;
    checkGameStatus();
  }
}

// handle a letter being clicked through the displayed keyboard
displayKeyboardDiv.addEventListener("click", (e) => {
  let letterClicked = e.target;
  updateGameScreen(letterClicked);
});

// handle a letter being typed through the user's physical keyboard
document.addEventListener("keyup", (e) => {
  if (
    document.activeElement != wordTryInputField &&
    alphabetString.includes(e.key)
    //contains(alphabet, e.key)
  ) {
    // if textfield has focus and if input is a letter
    let letterClicked = document.querySelector("#" + e.key);
    updateGameScreen(letterClicked);
  }
});

// handle the user wanting to submit a word
wordTryButton.addEventListener("click", (e) => {
  if (!wordTryInputDiv.hidden) {
    wordTryInputDiv.style.display = "block";
    wordTryButton.style.display = "none";
  }
  wordTryInputField.focus();
});

function handleWordInput() {
  if (wordTryInputField.value != "") {
    // handle word submission unless the field is empty
    handleWordTry(wordTryInputField.value);
    wordTryInputField.value = "";
  }
}

// handle the user pressing enter after writing a word
wordTryInputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleWordInput();
  }
});

wordTryInputSubmit.addEventListener("click", (e) => {
  handleWordInput();
});

// main logic "loop"
initGame();

// TO DO
// handle replay button
// handle adding a word to the dictionary
