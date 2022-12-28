# Jeu du Pendu / Hangman

## Présentation du jeu / Game presentation

Ce célèbre jeu consiste à deviner un mot, lettre par lettre. Chaque bonne lettre entrée révèlera un peu plus le mot final à deviner, tandis que chaque mauvaise lettre entrée ajoutera des détails au dessin du pendu. Si le pendu apparaît en entier, c'est perdu !

This famous game consists of guessing a secret word, letter by letter. Each correct letter guessed will reveal the secret word, while each wrong letter will add details to the hangman drawing. If the hangman is complete, you lose !

---

## Informations techniques / Technical information

Ce jeu est réalisé en HTML/CSS/JS. Toute la logique du jeu réside dans le fichier index.js. En guise de défi personnel, je voulais également gérer toute la génération du corps HTML en JavaScript. J'ai aussi choisi de n'utiliser aucune librairie externe de type jQuery ou Bootstrap, et de tout faire en "vanilla JavaScript".

This game is made using HTML/CSS/JS. All of the game logic is in the index.js file. As a personal challenge, I also wanted to handle the whole HTML body code generation in JavaScript. I also chose not to use a single external library like jQuery or Bootstrap, and to do everything in "vanilla JavaScript".

---

## Fonctionnalités / Features

- proposer une lettre via le clavier physique
- proposer une lettre via les boutons affichés à l'écran
- proposer un mot entier
- ajouter un mot à la liste de mots possibles (via les cookies)
- purger la liste de mots ajoutés par l'utilisateur (en vidant les cookies)

- input a letter through the physical keyboard
- input a letter through the buttons displayed on screen
- input an entire word
- add a word to the word pool (via cookies)
- clear the list of words added by the user (by clearing cookies)

---

## Reste à faire / To do list

- [ ] améliorer la propreté du rendu du canvas JS
- [ ] améliorer l'expérience utilisateur (par ex. rendre le message de fin de partie plus joli)
- [ ] ajouter un mode sombre
- [ ] créer une API dictionnaire, avec différents endpoints pour faire des thématiques de mots différentes (films, plantes, villes, animaux, Pokémon, etc)
- [ ] gérer le multilangue dans les options, et traduire les instructions à l'écran ainsi que les listes de mots
- [ ] améliorer le niveau de paramétrage du jeu (par exemple choix du nombre de vies)
- [ ] ajouter un compteur de victoires à la suite

- [ ] improve neatness of the JS canvas rendering
- [ ] improve user experience (i.e. make the end game message prettier)
- [ ] add a dark mode
- [ ] create a dictionary API, with different endpoints to have different word pool themes (movies, plants, cities, animals, Pokémon, etc)
- [ ] handle different languages in the options, and translate both the on-screen instructions and the word pools
- [ ] increase the depth of settings (i.e. choose the amount of lives)
- [ ] add a counter to track the amount of wins in a row

---

## Jouer ! / Play !

Le lien pour jouer est trouvable sur mon portfolio

The link to play the game can be found in my portfolio

---

## Branches Git / Git Branches

La branche master représente le travail en cours. La branche main est celle déployée sur le portfolio.

The master branch represents the work in progress. The main branch is the code deployed on my portfolio.
