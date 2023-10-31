// Code for Hangman game. Runs in JavaScript Nodejs.

const prompt = require("prompt-sync")({ sigint: true });

class WordManager {
  easyWords = ["cat", "dog", "ball", "park"]
  hardWords = ["elephant", "telephone", "computer", "aeroplane", "universe"]
  index = 0;
  
  getWord = (level) => {
    if(level==="easy") {
      this.index = Math.floor(Math.random() * this.easyWords.length);
      return this.easyWords[this.index];
    }

    if(level==="hard") {
      this.index = Math.floor(Math.random() * this.hardWords.length);
      return this.hardWords[this.index];
    }
  }
}


class HangmanGame {
  word = "";
  playerWord = "";

  isLetter = (s) => {
    return s.match("[a-zA-Z]");    
  }

  initialize = () => {
    this.word = "";
    this.playerWord = "";
  } 
  
  play = () => {
    this.initialize();
    
    let wm = new WordManager();
    this.word = wm.getWord("easy");
    for(let i=0;i<this.word.length;i++) {
      this.playerWord = this.playerWord + "_";
    }
    console.log(this.playerWord);
    
    let guesses = [];
    let solved = false;
    while(!solved) {
      let letter = prompt("What is your guess? ")
      if(letter.length!=1 || 
         !this.isLetter(letter) || 
         guesses.includes(letter) || 
         !this.word.includes(letter)) {
        console.log("Invalid guess.");
        continue;
      }
      for(let i=0;i<this.word.length;i++) {
        if(this.word[i] === letter) {
          let temp = this.playerWord.split("");
          temp[i] = letter;
          this.playerWord = temp.toString();
          console.log("Your guess was right!");
          console.log(this.playerWord);
        }
      }
    }
  }
}

let game = new HangmanGame();
game.play();
