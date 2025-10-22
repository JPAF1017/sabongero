import inquirer from 'inquirer';

//=======================================================================================================
// Monstie stats
export interface MonstieStat {
  id: number;
  level: number;
  health: number;
  name: string;
  moves: string[];
}
//=======================================================================================================

//=======================================================================================================
// Team of monsties
export const team: MonstieStat[] = [];
//=======================================================================================================

//=======================================================================================================
// Collection of Monstie
export const monstie: MonstieStat[] = [
  { id: 1, level: 1, health: 10, name: "Rommeller", moves: ["attack", "fire", "heal"] },
  { id: 2, level: 1, health: 10, name: "TheMyle", moves: ["attack", "water", "heal"] },
  { id: 3, level: 1, health: 10, name: "Kinit", moves: ["attack", "leaf", "heal"] },
  { id: 4, level: 1, health: 10, name: "Paolito", moves: ["attack", "leaf", "heal"] },
];
//=======================================================================================================

//=======================================================================================================
// Function to handle starter monstie selection
export async function selectStarterMonstie(): Promise<void> {
  console.log("Choose your starter monstie");
  let choice = "";
  while (choice !== "1" && choice !== "2" && choice !== "3") {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'starter',
        message: 'Choose your starter monstie (1: Rommeller, 2: TheMyle, 3: Kinit):',
      }
    ]);
    choice = answer.starter.trim();
  }
  
// Add the chosen starter to the team
  const chosenIndex = parseInt(choice) - 1;
  const chosenMonstie = monstie[chosenIndex];
  if (chosenMonstie) {
    team.push(chosenMonstie);
    console.log(`You chose ${chosenMonstie.name}! Welcome to your team!\n`);
  }
}
//=======================================================================================================