import inquirer from 'inquirer';
import { team, monstie } from './Monstie.js';
import type { MonstieStat } from './Monstie.js';

//=======================================================================================================
// Function for displaying monsties
export function displayMonsties(): void {
  console.log("\n=== Your Team ===");
  if (team.length === 0) {
    console.log("You don't have any monsties in your team yet!");
  } else {
    team.forEach((monstie, index) => {
      console.log(`${index + 1}. ${monstie.name} (Level: ${monstie.level})`);
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
      await fightScene(enemy);
      break;
  }
}
//=======================================================================================================

//=======================================================================================================
// Function for a fight scene
export async function fightScene(enemy: MonstieStat): Promise<void> {
  if (team.length === 0) {
    console.log("You don't have any monsties to fight with!");
    return;
  }

  // Display available monsties
  console.log("\n");
  console.log("Choose your monstie for battle:");
  team.forEach((monstie, index) => {
    console.log(`${index + 1}. ${monstie.name} (Level: ${monstie.level}, Health: ${monstie.health})`);
  });

  // Choosing a monstie
  let selectedIndex = -1;
  while (selectedIndex < 0 || selectedIndex >= team.length) {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'action',
        message: `Choose your monstie (1-${team.length}):`,
      }
    ]);
    const choice = parseInt(response.action.trim());
    selectedIndex = choice - 1;
    
    if (selectedIndex < 0 || selectedIndex >= team.length) {
      console.log(`Please enter a valid number between 1 and ${team.length}`);
    }
  }
}
//=======================================================================================================