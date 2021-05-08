window.alert("Welcome to the Imperial City Arena!");
console.log("hello!");

var playerInfo = {
  name: window.prompt("What is your Combatant's name?"),
  health: 100,
  attack: 13,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
    this.health += 12;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough coin...")
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
    this.attack += 8;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough coin...")
    }
  } 
}

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min + 1)) + min;
  
  return value;
};

var enemyInfo = [
  {
    name: "Aldrich, Devourer of Gods",
    attack: randomNumber(10, 12)
  },
  {
    name: "Dancer of the Boreal Valley",
    attack: randomNumber(9, 14)
  },
  {
    name: "Soul of Cinder",
    attack: randomNumber(11, 15)
  }
];

var fight = function(enemy) {
  console.log(enemy);
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    };

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' vigor remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' vigor left.');
    }

    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    // remove players's health by subtracting the amount set in the enemy.attack variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' vigor remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert('YOU DIED');
      window.alert(enemy.name + ' is our champion!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' vigor left.');
    }
  }
};

// function to start game
var startGame = function() {
  // reset player stats
  playerInfo.reset();
  for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert('Pit Dogs, begin round ' + (i + 1) + '!');
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);
      // if we're not at last enemy in array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask to enter store
        var storeConfirm = window.confirm("The fight is over. Visit the Fire Keeper before the next round?");
        if (storeConfirm) {
          shop();
        }
      }
    }
  }
  endGame();
};

var endGame = function () {
  window.alert ("Your journey is now complete. Your legacy is as follows...");
    // if still alive
    if (playerInfo.health > 0) {
      window.alert("Congratulations. Your enemies have beem vanquished and the First Flame restored.");
    }
    // if dead
    if (playerInfo.health <= 0) {
      window.alert("The Age of Fire is over, and doomed is your dark soul.");
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    
    if (playAgainConfirm) {
      // restart the game
      startGame();
    } 
    else {
      window.alert("As prophesized, The Hero will return again.");
    }
  };

var shop = function() {
  // ask player what they want to do
  var shopPrompt = window.prompt("Would you like to REFILL your vigor, UPGRADE your attack, or LEAVE the Bonfire? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.")
  console.log("entered the shop");

  // use switch to carry out action
  switch (shopPrompt) {
    case "refill":
    case "REFILL":
      playerInfo.refillHealth();
      break;
    case "upgrade":
    case "UPGRADE":
      playerInfo.upgradeAttack();
      break;
    case "leave":
    case "LEAVE":
      window.alert("Leaving the Bonfire.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start game when page loads
startGame();