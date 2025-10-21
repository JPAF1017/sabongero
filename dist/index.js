import inquirer from 'inquirer';
import { team, monstie } from './components/Monstie.js';
import { displayMonsties, encounterMonstie } from './components/Commands.js';
// Main input loop function
async function startInputLoop() {
    console.log("Welcome to Sabongero!");
    console.log("Commands: list, explore, exit\n");
    // Checks if team is empty, then show starter monstie choices
    if (team.length === 0) {
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
    // Error handler
    while (true) {
        try {
            let trimmedCommand = "";
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'action',
                    message: 'Enter command:',
                }
            ]);
            trimmedCommand = answer.action.trim().toLowerCase();
            // Input outcomes
            if (trimmedCommand === 'list') {
                displayMonsties();
            }
            else if (trimmedCommand === 'explore') {
                encounterMonstie();
            }
            else if (trimmedCommand === 'exit') {
                console.log("Goodbye!");
                break;
            }
            else {
                console.log(`Unknown command: "${answer}".`);
            }
        }
        catch (error) {
            console.log("An error occurred:", error);
            break;
        }
    }
}
// Start the application
startInputLoop();
//# sourceMappingURL=index.js.map