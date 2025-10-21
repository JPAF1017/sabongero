import inquirer from 'inquirer';
import { team, monstie } from './Monstie.js';
import type { MonstieStat } from './Monstie.js';

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

// Function for exploring
export function encounterMonstie(): void {
  const randomID = Math.floor(Math.random() * monstie.length);
  const enemy = monstie[randomID];
  if (enemy) {
    console.log(`You have encountered a wild ${enemy.name}!`);
  } else {
    console.log("No monsties available to encounter!");
  }
  console.log("\n");
}