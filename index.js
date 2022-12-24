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
let wordToGuess = "test";
let wordList = ["baguette", "frites"];
let lettersGuessed = [];
let wordsGuessed = [];
let displayedWord = "";
let displayedWordArray = [];
let triesLeft = 7;
let emptyLettersLeft = 0;
let gameStatus = Status.Fresh;
let wordsAddedByUser = [];

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
settingsDiv.appendChild(endGameMessageDiv);
settingsDiv.appendChild(replayGameButton);
addWordInputField.setAttribute("type", "text");
addWordInputSubmit.setAttribute("type", "submit");
addWordInputSubmit.textContent = "Ajouter";
settingsDiv.appendChild(addWordButton);
addWordInputDiv.appendChild(addWordInputField);
addWordInputDiv.appendChild(addWordInputSubmit);
settingsDiv.appendChild(addWordInputDiv);
clearCookiesButton.textContent = "Vider les cookies";
settingsDiv.appendChild(clearCookiesButton);
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
  addWordButton.style.display = "block";
  addWordInputDiv.style.display = "none";

  // get words from user's cookies
  let cookies = document.cookie;
  console.log("content of cookies : " + cookies);
  if (cookies.match(/^(.*;)?\s*words\s*=\s*[^;]+(.*)?$/)) {
    console.log("Cookies contain words !");
    cookies = cookies.slice(6); // if cookies exist, remove "words=" in front
    wordsAddedByUser = cookies.slice(",");
    console.log("list of words added by user : " + wordsAddedByUser);
    wordList = [...wordList, ...wordsAddedByUser];
    console.log("total list of words : " + wordList);
  } else {
    console.log("cookies are empty");
  }
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
  console.log(
    "list of possible words to guess : " +
      wordList +
      ", with " +
      wordList.length +
      " elements"
  );
  wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("word to guess : " + wordToGuess);
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
      emptyLettersLeft +
      ", letters tried : " +
      lettersGuessed
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
  console.log("letters guessed status in updateGamescreen : " + lettersGuessed);
  listOfLettersTriedDiv.textContent =
    "Liste des lettres essayées : " + lettersGuessed;
  displayWord();
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
}

function displayEndGameMessage() {
  displayWord();
  let message;
  if (gameStatus == Status.Success) {
    message = "Félicitations ! Vous avez gagné ! Voulez-vous rejouer ?";
  } else if (gameStatus == Status.Defeat) {
    message = "Dommage, vous avez perdu =( Voulez-vous rejouer ?";
  }
  //alert(message);
  endGameMessageDiv.textContent = message;
  endGameMessageDiv.style.display = "block";
  // make a new div to display an end game message based on gameStatut
}

function purgeGameData() {
  displayedWordArray.length = 0;
  triesLeft = 7;
  emptyLettersLeft = 0;
  lettersGuessed = [];
  wordsGuessed = [];
  gameStatus = Status.Ongoing;
  listOfLettersTriedDiv.textContent = "Liste des lettres essayées : ";
  listOfWordsTriedDiv.textContent = "Liste des mots essayés : ";
}

function refreshKeyboard() {
  const letters = document.querySelectorAll(".tried");

  letters.forEach((letter) => {
    letter.classList.remove("tried");
    letter.disabled = false;
  });
}

function playAgain() {
  purgeGameData();
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

// handle word try unless the field is empty
function handleWordInput() {
  if (wordTryInputField.value != "") {
    handleWordTry(wordTryInputField.value);
    wordTryInputField.value = "";
  }
}

function addWordToDictionary(newWord) {
  wordsAddedByUser.push(newWord);
  wordList.push(newWord);
  document.cookie = "words=" + wordsAddedByUser;
  console.log(
    "word " +
      newWord +
      " added to dictionary, list of words added by user is " +
      wordsAddedByUser +
      "and complete list of words is " +
      wordList
  );
}

// handle new word submission to dictionary unless the field is empty
function handleWordSubmission() {
  console.log(addWordInputField.value);
  if (addWordInputField.value != "") {
    console.log("word is submitted : " + addWordInputField.value);
    addWordToDictionary(addWordInputField.value);
    addWordInputField.value = "";
  }
}

// Event listeners

// handle a letter being clicked through the displayed keyboard
displayKeyboardDiv.addEventListener("click", (e) => {
  if (gameStatus == Status.Ongoing) {
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

clearCookiesButton.addEventListener("click", () => {
  document.cookie = "words=";
  console.log("cookies purged ! New cookie content : " + document.cookie);
});

// main logic "loop"
initGame();

// TO DO
// handle adding a word to the dictionary
// add button to purge cookie data
