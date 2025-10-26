import inquirer from 'inquirer';
//=======================================================================================================
//=======================================================================================================
// Reusable Input Handler Class
export class InputHandler {
    // Basic input method - gets any string input
    async getInput(message) {
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'response',
                message: message,
            }
        ]);
        return answer.response.trim().toLowerCase();
    }
    // Validated input method - ensures input meets certain criteria
    async getValidatedInput(message, options = {}) {
        const { validAnswers, errorMessage } = options;
        let input = "";
        if (validAnswers) {
            // Keep asking until we get a valid answer from the list
            while (!validAnswers.includes(input)) {
                const answer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'response',
                        message: message,
                    }
                ]);
                input = answer.response.trim().toLowerCase();
                if (!validAnswers.includes(input)) {
                    console.log(errorMessage || `Please enter one of: ${validAnswers.join(', ')}`);
                }
            }
        }
        else {
            // Just get input once if no validation needed
            input = await this.getInput(message);
        }
        return input;
    }
    // Number input method - gets and validates numeric input
    async getNumberInput(message, options = {}) {
        const { minValue, maxValue, errorMessage } = options;
        let validNumber = false;
        let number = 0;
        while (!validNumber) {
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'response',
                    message: message,
                }
            ]);
            const parsed = parseInt(answer.response.trim());
            if (isNaN(parsed)) {
                console.log("Please enter a valid number");
                continue;
            }
            if (minValue !== undefined && parsed < minValue) {
                console.log(errorMessage || `Please enter a number >= ${minValue}`);
                continue;
            }
            if (maxValue !== undefined && parsed > maxValue) {
                console.log(errorMessage || `Please enter a number <= ${maxValue}`);
                continue;
            }
            number = parsed;
            validNumber = true;
        }
        return number;
    }
    // Choice input method - gets selection from a numbered list
    async getChoiceInput(message, choices, startIndex = 1) {
        // Display choices
        console.log(message);
        choices.forEach((choice, index) => {
            console.log(`${index + startIndex}. ${choice}`);
        });
        const selectedIndex = await this.getNumberInput(`Choose an option (${startIndex}-${choices.length + startIndex - 1}):`, {
            minValue: startIndex,
            maxValue: choices.length + startIndex - 1,
            errorMessage: `Please enter a valid number between ${startIndex} and ${choices.length + startIndex - 1}`
        });
        return selectedIndex - startIndex; // Return 0-based index
    }
    // Command input method - specifically for game commands
    async getCommandInput() {
        return await this.getInput('Enter command:');
    }
}
// Create and export a default instance for convenience
export const inputHandler = new InputHandler();
//=======================================================================================================
//# sourceMappingURL=Input.js.map