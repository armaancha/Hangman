// Class to manage the game words.

const fs = require("fs");
const axios = require("axios");

class WordManager {
  index = 0;

  getWord = async (level) => {
    let response = await axios.get("https://raw.githubusercontent.com/powerlanguage/word-lists/master/1000-most-common-words.txt");
    let wordList = response.data;
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
