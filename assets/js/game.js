window.alert("Welcome to the Imperial City Arena!");
  console.log("hello!");

var playerInfo = {
  name: window.prompt("What is your Combatant's name?"),
  health: 100,
  attack: 10,
  money: 10
}

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

for(var i = 0; i < enemyNames.length; i++) {
  console.log(enemyNames[i]);
  console.log(i);
  console.log(enemyNames[i] + " is at " + i + " index");
};

var fight = function(enemyName) {
  while (playerInfo.health > 0 && enemyHealth > 0) {
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
        playerInfo.money = playerInfo.money - 10;
        console.log("playerInfo.money", playerInfo.money)
        break;
      }
    };

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemyHealth = enemyHealth - playerInfo.attack;
    console.log(
      playerInfo.name + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerInfo.health = playerInfo.health - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert('YOU DIED');
      window.alert(enemyName + ' is our champion!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// function to start game
var startGame = function() {
  // reset player stats
  playerInfo.health = 100;
  playerInfo.attack = 10;
  playerInfo.money = 10;
  for(var i = 0; i < enemyNames.length; i++) {
    if (playerInfo.health > 0) {
      window.alert('Pit Dogs, begin round ' + (i + 1) + '!');
      var pickEnemyName = enemyNames[i];
      enemyHealth = 50;
      fight(pickEnemyName);
      // if we're not at last enemy in array
      if (playerInfo.health > 0 && i < enemyNames.length - 1) {
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
      if (playerInfo.money >= 7) {
        window.alert("Refilling player's vigor by 10 for 7 coin.");

        // increase health and decrease money
        playerInfo.health = playerInfo.health + 10;
        playerInfo.money = playerInfo.money - 7;
      }
      else {
        window.alert("You don't have enough coin...")
        shop();
      }
      break;
    case "upgrade":
    case "UPGRADE":
      if (playerInfo.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 coin.");

        // increase attack and decrease money
        playerInfo.attack = playerInfo.attack + 6;
        playerInfo.money = playerInfo.money - 7;
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