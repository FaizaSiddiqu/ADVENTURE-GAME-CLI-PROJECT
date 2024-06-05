// #! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.magentaBright("\n \t WELCOME TO MY NEW PROJECT ---- 'ADVENTURE GAME' "));

class Player {
  name: string;
  health: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 10;
  }

  increaseHealth() {
    this.health = 100;
  }
}

class Enemy {
  name: string;
  health: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  decreaseHealth() {
    this.health -= 10;
  }

  increaseHealth() {
    this.health = 100;
  }
}

async function main() {
  const { playerName } = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: chalk.greenBright("Enter your player Name:"),
    },
  ]);
  console.log("\n")

  const { enemyName } = await inquirer.prompt([
    {
      name: "enemyName",
      type: "list",
      message: chalk.greenBright("Select the enemy you fight with:"),
      choices: ["alien", "witch", "zombie"],
    },
  ]);
  console.log("\n")

  const player = new Player(playerName);
  const enemy = new Enemy(enemyName);

  console.log(chalk.blueBright.bold(`${enemy.name} v/s ${player.name}`));

  while (true) {
    const { action } = await inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: chalk.greenBright("Choose your action:"),
        choices: ["Attack", "Defend", "Run"],
      },
    ]);
    console.log("\n")

    switch (action) {
      case "Attack":
        const randomNumber = Math.random();

        if (randomNumber > 0.5) {
          player.decreaseHealth();
          console.log(chalk.hex('#FFFFFF')(`${player.name} Health: ${player.health}`));
          console.log(chalk.hex('#FFFFFF')(`${enemy.name} Health: ${enemy.health}`));

          if (player.health <= 0) {
            console.log(chalk.redBright("You Lose!! Try Again"));
            process.exit();  // Exit the program
          }
        } else {
          enemy.decreaseHealth();
          console.log(chalk.hex('#FFFFFF')(`${player.name} Health: ${player.health}`));
          console.log(chalk.hex('#FFFFFF')(`${enemy.name} Health: ${enemy.health}`));

          if (enemy.health <= 0) {
            console.log(chalk.yellowBright.bold("Congratulations!! You Won"));
            process.exit();  // Exit the program
          }
        }
        break;

      case "Defend":
        console.log(chalk.cyanBright("You chose to defend!"));
        break;

      case "Run":
        console.log(chalk.redBright("You chose to run away! Game Over."));
        process.exit();
        break;  // Exit the program
        
        

      default:
        console.log(chalk.redBright("Invalid action!"));
        break;
    }
  }
}

main();

