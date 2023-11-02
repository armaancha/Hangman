// Code for Hangman game. Runs in JavaScript Nodejs.

const prompt = require("prompt-sync")({ sigint: true });

class WordManager {
  easyWords = ["cct", "ddg", "ball", "aark"]
  hardWords = ["elephant", "telephone", "computer", "aeroplane", "universe"]
  index = 0;
  
  getWord = (level) => {
    if(level===1) {
      this.index = Math.floor(Math.random() * this.easyWords.length);
      return this.easyWords[this.index];
    }

    if(level===2) {
      this.index = Math.floor(Math.random() * this.hardWords.length);
      return this.hardWords[this.index];
    }
  }
}

class SettingsManager 
  settings = {
    level: 1,
    guessCount: 10
  }

  askSettings = () => {
    this.settings.level = parseInt(prompt("What level of difficulty? 1 for easy, 2 for hard, 3 for impossible."))

    if (this.settings.level===1) {
      this.settings.guessCount = 10;
    }
    else if (this.settings.level===2) {
      this.settings.guessCount = 5;
    }
    else if (this.settings.level===3) {
      this.settings.guessCount = 3;
    }

    return this.settings;
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

  checkWin = () => {
    return this.playerWord.includes("_") ? false : true;
  }
  
  play = () => {
    this.initialize();

    let sm = new SettingsManager();
    let settings = sm.askSettings();
    
    let wm = new WordManager();
    this.word = wm.getWord(settings.level).toUpperCase();
    for(let i=0;i<this.word.length;i++) {
      this.playerWord = this.playerWord + "_";
    }
    console.log(this.playerWord);
    
    let guesses = [];
    let solved = false;
    while(!solved) {
      let letter = prompt("What is your guess? ")
      letter = letter.toUpperCase();
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
          this.playerWord = temp.join("");
        }
      }
      guesses.push(letter);
      if(this.checkWin()) {
        console.log("\nYou won!")
        console.log(this.playerWord + "\n");
        return;
      }
      console.log("\nYour guess was right!");
      console.log(this.playerWord + "\n");
    }
  }
}

let game = new HangmanGame();
game.play();
