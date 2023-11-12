// Class for the main game.

const { SettingsManager } = require("./settingsManager.js")
const { WordManager } = require("./wordManager.js")
const prompt = require("prompt-sync")({ sigint: true });

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

  play = async () => {
    this.initialize();

    let sm = new SettingsManager();
    let settings = sm.askSettings();

    let wm = new WordManager();
    this.word = await wm.getWord(settings.level);
    this.word = this.word.toUpperCase();
    for(let i=0;i<this.word.length;i++) {
      this.playerWord = this.playerWord + "_";
    }
    console.log(this.playerWord);

    let guesses = [];
    let solved = false;
    while(!solved && settings.guessCount>0) {
      let letter = prompt("What is your guess? ")
      letter = letter.toUpperCase();
      if(letter.length!=1 || 
         !this.isLetter(letter) || 
         guesses.includes(letter)) {
        if(letter===this.word) {
          console.log("\nYou won!")
          console.log(this.word + "\n");
          return;
        }
        if(letter.length<=2) {
          console.log("Invalid guess.\n");
          continue;
        }
      }

      settings.guessCount--;
      
      if(settings.guessCount<=0) {
        console.log("\nOut of guesses!");
        console.log("The word was " + this.word);
        return;
      }

      if(!this.word.includes(letter)) {
        guesses.push(letter);
        console.log("Incorrect guess.\n");
        console.log("You have " + settings.guessCount + " guesses remaining.")
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
      console.log("You have " + settings.guessCount + " guesses remaining.")
    }
  }
}

module.exports = { HangmanGame };
