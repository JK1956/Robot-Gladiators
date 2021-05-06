window.alert("Welcome to the Imperial City Arena!");
  console.log("hello!");

var playerName = window.prompt("What is your Combatant's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

for(var i = 0; i < enemyNames.length; i++) {
  console.log(enemyNames[i]);
  console.log(i);
  console.log(enemyNames[i] + " is at " + i + " index");
};

var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney)
        break;
      }
    };

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' vigor remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' vigor left.');
    }

    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' vigor remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert('YOU DIED');
      window.alert(enemyName + ' is our champion!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' vigor left.');
    }
  }
};

// function to start game
var startGame = function() {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  for(var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      window.alert('Pit Dogs, begin round ' + (i + 1) + '!');
      var pickEnemyName = enemyNames[i];
      enemyHealth = randomNumber(40, 60)
      fight(pickEnemyName);
      // if we're not at last enemy in array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
      window.alert("Congratulations. Your enemies have beem vanquished and the First Flame restored.");
    }
    // if dead
    if (playerHealth <= 0) {
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
  
// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min + 1)) + min;
  
  return value;
};

var shop = function() {
  // ask player what they want to do
  var shopPrompt = window.prompt("Would you like to REFILL your vigor, UPGRADE your attack, or LEAVE the Bonfire? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.")
  console.log("entered the shop");

  // use switch to carry out action
  switch (shopPrompt) {
    case "refill":
    case "REFILL":
      if (playerMoney >= 7) {
        window.alert("Refilling player's vigor by 10 for 7 coin.");

        // increase health and decrease money
        playerHealth = playerHealth + 10;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough coin...")
        shop();
      }
      break;
    case "upgrade":
    case "UPGRADE":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 coin.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough coin...");
        shop();
      }
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