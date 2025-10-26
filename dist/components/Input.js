import inquirer from 'inquirer';
//=======================================================================================================
// Generic function to handle input prompts
export async function getInput(config) {
    const answer = await inquirer.prompt([
        {
            type: config.type || 'input',
            name: config.name || 'action',
            message: config.message,
        }
    ]);
    return answer[config.name || 'action'].trim();
}
//=======================================================================================================
// Specific reusable input functions for common patterns
// Function for general command input
export async function getCommandInput() {
    return getInput({ message: 'Enter command:' });
}
// Function for choice input with validation
export async function getChoiceInput(message, validChoices, caseSensitive = false) {
    let choice = "";
    const validChoicesSet = new Set(caseSensitive ? validChoices : validChoices.map(c => c.toLowerCase()));
    while (!validChoicesSet.has(caseSensitive ? choice : choice.toLowerCase())) {
        choice = await getInput({ message });
        if (!validChoicesSet.has(caseSensitive ? choice : choice.toLowerCase())) {
            console.log(`Please enter one of: ${validChoices.join(', ')}`);
        }
    }
    return caseSensitive ? choice : choice.toLowerCase();
}
// Function for numeric choice input with validation
export async function getNumericChoiceInput(message, min, max) {
    let selectedIndex = -1;
    while (selectedIndex < min || selectedIndex > max) {
        const input = await getInput({ message });
        const choice = parseInt(input);
        selectedIndex = choice - 1; // Convert to 0-based index
        if (selectedIndex < min || selectedIndex > max) {
            console.log(`Please enter a valid number between ${min + 1} and ${max + 1}`);
        }
    }
    return selectedIndex;
}
// Function for fight move input
export async function getFightMoveInput(moves, enemyName) {
    const moveOptions = moves.map((move, index) => `${index + 1}. ${move}`).join('\n');
    const message = `Choose your move:\n${moveOptions}\n4. Capture ${enemyName}\nEnter 1, 2, 3, or 4:`;
    return getChoiceInput(message, ["1", "2", "3", "4"]);
}
//=======================================================================================================
//# sourceMappingURL=Input.js.map