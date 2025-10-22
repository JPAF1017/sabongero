import inquirer from 'inquirer';
import { team, selectStarterMonstie } from './Monstie.js';
import { displayMonsties, encounterMonstie } from './Commands.js';
// Function to handle general command input
export async function getCommandInput() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'action',
            message: 'Enter command:',
        }
    ]);
    return answer.action.trim().toLowerCase();
}
// Function to process commands
export async function processCommand(command) {
    switch (command) {
        case 'list':
            displayMonsties();
            return true;
        case 'explore':
            await encounterMonstie();
            return true;
        case 'exit':
            console.log("Goodbye!");
            return false;
        default:
            console.log(`Unknown command.`);
            console.log("Commands: list, explore, exit\n");
            return true;
    }
}
// Main input loop function
export async function startInputLoop() {
    console.log("Welcome to Sabongero!");
    console.log("Commands: list, explore, exit\n");
    // Checks if team is empty, then show starter monstie choices
    if (team.length === 0) {
        await selectStarterMonstie();
    }
    // Error handler and main command loop
    while (true) {
        try {
            const command = await getCommandInput();
            const shouldContinue = await processCommand(command);
            if (!shouldContinue) {
                break;
            }
        }
        catch (error) {
            console.log("An error occurred:", error);
            break;
        }
    }
}
//# sourceMappingURL=Input.js.map