import inquirer from 'inquirer';
import { team, monstie } from './Monstie.js';
//=======================================================================================================
// Function for displaying monsties
export function displayMonsties() {
    console.log("\n=== Your Team ===");
    if (team.length === 0) {
        console.log("You don't have any monsties in your team yet!");
    }
    else {
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
export async function encounterMonstie() {
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
//=======================================================================================================
// Function choosing a monstie for fighting
export async function fightStart(enemy) {
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
    const chosenMonstie = team[selectedIndex];
    console.log(`You chose ${chosenMonstie.name} to fight against ${enemy.name}!\n`);
    await fightScene(chosenMonstie, enemy);
}
//=======================================================================================================
//=======================================================================================================
// Function for fighting
export async function fightScene(chosenMonstie, enemy) {
    let playerHealth = chosenMonstie.health;
    let enemyHealth = enemy.health;
    while (playerHealth > 0 && enemyHealth > 0) {
        let action = "";
        while (action !== "1" && action !== "2" && action !== "3") {
            const response = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'move',
                    message: `Choose your move:\n1. ${chosenMonstie.moves[0]}\n2. ${chosenMonstie.moves[1]}\n3. ${chosenMonstie.moves[2]}\nEnter 1, 2, or 3:`,
                }
            ]);
            action = response.move.trim();
        }
        switch (action) {
            case "1":
                console.log(`\n${chosenMonstie.name} attacks for 2 damage!\n`);
                enemyHealth -= 2;
                await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            case "2":
                const damage = calculateElementDamage(chosenMonstie, enemy);
                console.log(`\n${chosenMonstie.name} uses ${chosenMonstie.moves[1]} for ${damage} damage!\n`);
                enemyHealth -= damage;
                await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            case "3":
                console.log(`\n${chosenMonstie.name} heals for 2 health!\n`);
                playerHealth += 2;
                await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
        }
        if (enemyHealth <= 0) {
            console.log(`\n${enemy.name} has been defeated! You win the battle!\n`);
            return;
        }
        if (playerHealth <= 0) {
            console.log(`\n${chosenMonstie.name} has been defeated! You lost the battle!\n`);
            return;
        }
    }
}
//=======================================================================================================
// Element interaction function
// stronger move deals 4 damage, weaker move deals 1 damage
function calculateElementDamage(chosenMonstie, enemy) {
    // Base damage for element moves
    const strongDamage = 4;
    const weakDamage = 1;
    if (chosenMonstie.moves[1] === "fire" && enemy.moves[1] === "leaf") {
        return strongDamage;
    }
    else if (chosenMonstie.moves[1] === "leaf" && enemy.moves[1] === "water") {
        return strongDamage;
    }
    else if (chosenMonstie.moves[1] === "water" && enemy.moves[1] === "fire") {
        return strongDamage;
    }
    else {
        return weakDamage;
    }
}
//=======================================================================================================
// Function for enemy's turn
export async function enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie) {
    const randomID = Math.floor(Math.random() * enemy.moves.length);
    const enemyMove = enemy.moves[randomID];
    switch (enemyMove) {
        case "attack":
            console.log(`\n${enemy.name} attacks for 2 damage!\n`);
            playerHealth -= 2;
            break;
        case "fire":
            console.log(`\n${enemy.name} uses fire!\n`);
            const fireDamage = await enemyElementDamage(enemy, chosenMonstie);
            playerHealth -= fireDamage;
            break;
        case "water":
            console.log(`\n${enemy.name} uses water!\n`);
            const waterDamage = await enemyElementDamage(enemy, chosenMonstie);
            playerHealth -= waterDamage;
            break;
        case "leaf":
            console.log(`\n${enemy.name} uses leaf!\n`);
            const leafDamage = await enemyElementDamage(enemy, chosenMonstie);
            playerHealth -= leafDamage;
            break;
        case "heal":
            console.log(`\n${enemy.name} heals for 2 health!\n`);
            enemyHealth += 2;
            break;
    }
}
//=======================================================================================================
// Elemental interaction for enemy attaclk
async function enemyElementDamage(enemy, chosenMonstie) {
    const strongDamage = 4;
    const weakDamage = 1;
    if (enemy.moves[1] === "fire" && chosenMonstie.moves[1] === "leaf") {
        return strongDamage;
    }
    else if (enemy.moves[1] === "leaf" && chosenMonstie.moves[1] === "water") {
        return strongDamage;
    }
    else if (enemy.moves[1] === "water" && chosenMonstie.moves[1] === "fire") {
        return strongDamage;
    }
    else {
        return weakDamage;
    }
}
//# sourceMappingURL=Commands.js.map