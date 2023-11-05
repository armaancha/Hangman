// Class for the game settings.

const prompt = require("prompt-sync")({ sigint: true });

class SettingsManager {
  settings = {
    level: 1,
    guessCount: 10
  }

  askSettings = () => {
    this.settings.level = parseInt(prompt("What level of difficulty? 1 for easy, 2 for hard, 3 for impossible. "))

    if (this.settings.level===1) {
      this.settings.guessCount = 10;
    }
    else if (this.settings.level===2) {
      this.settings.guessCount = 7;
    }
    else if (this.settings.level===3) {
      this.settings.guessCount = 5;
    }

    return this.settings;
  }
}

module.exports = { SettingsManager };
