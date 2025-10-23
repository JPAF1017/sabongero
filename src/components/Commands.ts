import inquirer from 'inquirer';
import { team, monstie } from './Monstie.js';
import type { MonstieStat } from './Monstie.js';
import { fightStart } from './Fighting.js';

//=======================================================================================================
// Function for displaying monsties
export function displayMonsties(): void {
  console.log("\n=== Your Team ===");
  if (team.length === 0) {
    console.log("You don't have any monsties in your team yet!");
  } else {
    team.forEach((monstie, index) => {
      console.log(`${index + 1}. ${monstie.name}`);
      console.log(`   Moves: ${monstie.moves.join(', ')}`);
    });
  }
  console.log("\n");
}
//=======================================================================================================

//=======================================================================================================
// Function for exploring
export async function encounterMonstie(): Promise<void> {
  const randomID = Math.floor(Math.random() * monstie.length);
  const enemy = monstie[randomID];
  
  if (!enemy) {
    console.log("No monsties available to encounter!");
    console.log("\n");
    return;
  }

  console.log(`You have encountered a wild ${enemy.name}!`);
  console.log("\n");

  console.log("What do you want to do?");
  let answer = "";
  while (answer !== "fight" && answer !== "flee") {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'action',
        message: 'Type "fight" to battle or "flee" to run away:',
      }
    ]);
    answer = response.action.trim().toLowerCase();
  }

  switch (answer) {
    case 'flee':
      console.log(`You fled from the wild ${enemy.name}!\n`);
      break;
    case 'fight':
      await fightStart(enemy);
      break;
  }
}
//=======================================================================================================