import inquirer from 'inquirer';
//Collection of Monstie
const monsties = [
    { id: 1, name: "Rommeller", moves: ["attack", "fire", "heal"] },
    { id: 2, name: "Kinit", moves: ["attack", "water", "heal"] },
    { id: 3, name: "Kinit", moves: ["attack", "leaf", "heal"] },
];
// Function to display all monsties
function displayMonsties() {
    console.log("\n=== All Monsties ===");
    monsties.forEach(monstie => {
        console.log(`ID: ${monstie.id}`);
        console.log(`Name: ${monstie.name}`);
        console.log(`Moves: ${monstie.moves.join(", ")}`);
        console.log("-------------------");
    });
}
// Main input loop function
async function startInputLoop() {
    console.log("Welcome to Sabongero!");
    console.log("Type 'list' to see all monsties, or 'exit' to quit.");
    while (true) {
        try {
            const { command } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'command',
                    message: 'Enter command:',
                }
            ]);
            const trimmedCommand = command.trim().toLowerCase();
            if (trimmedCommand === 'list') {
                displayMonsties();
            }
            else if (trimmedCommand === 'exit') {
                console.log("Goodbye!");
                break;
            }
            else {
                console.log(`Unknown command: "${command}". Try 'list' or 'exit'.`);
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