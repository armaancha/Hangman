// Class to manage the game words.

const fs = require("fs");

class WordManager {
  index = 0;

  getWord = (level) => {
    let buffer = fs.readFileSync("words.txt");
    let wordList = buffer.toString();
    let words = wordList.split("\n");

    if(level===1) {
      while(true) {
        this.index = Math.floor(Math.random() * words.length);
        if(words[this.index].trim().length<=4) {
          return words[this.index];
        }
      }
    }

    if(level>=2) {
      while(true) {
        this.index = Math.floor(Math.random() * words.length);
        if(words[this.index].trim().length>4) {
          return words[this.index];
        }
      }
    }
  }
}

module.exports = { WordManager };
