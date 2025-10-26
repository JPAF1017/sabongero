import { inputHandler } from './Input.js';
//=======================================================================================================
//=======================================================================================================
// Team of monsties
export const team = [];
//=======================================================================================================
//=======================================================================================================
// Collection of Monstie
export const monstie = [
    { id: 1, health: 10, name: "Rommeller", moves: ["attack", "fire", "heal"] },
    { id: 2, health: 10, name: "TheMyle", moves: ["attack", "water", "heal"] },
    { id: 3, health: 10, name: "Kinit", moves: ["attack", "leaf", "heal"] },
    { id: 4, health: 10, name: "Paolito", moves: ["attack", "fire", "heal"] },
    { id: 5, health: 10, name: "Jarvis", moves: ["attack", "water", "heal"] },
    { id: 6, health: 10, name: "Mikil", moves: ["attack", "leaf", "heal"] },
    { id: 7, health: 10, name: "IDunno", moves: ["attack", "fire", "heal"] },
    { id: 8, health: 10, name: "Wirelesswabbit", moves: ["attack", "water", "heal"] },
    { id: 9, health: 10, name: "Gabbagoo", moves: ["attack", "leaf", "heal"] }
];
//=======================================================================================================
//=======================================================================================================
// Function to handle starter monstie selection
export async function selectStarterMonstie() {
    const starterChoices = ["Rommeller", "TheMyle", "Kinit"];
    const selectedIndex = await inputHandler.getChoiceInput("Choose your starter monstie", starterChoices, 1);
    // Add the chosen starter to the team
    const chosenMonstie = monstie[selectedIndex];
    if (chosenMonstie) {
        team.push(chosenMonstie);
        console.log(`You chose ${chosenMonstie.name}! Welcome to your team!\n`);
    }
}
//=======================================================================================================
//# sourceMappingURL=Monstie.js.map