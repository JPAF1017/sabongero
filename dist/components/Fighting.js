import inquirer from 'inquirer';
import { team } from './Monstie.js';
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
        console.log(`${index + 1}. ${monstie.name} (Health: ${monstie.health}) (Element: ${monstie.moves[1]})`);
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
    let maxPlayerHealth = chosenMonstie.health;
    let enemyHealth = enemy.health;
    let enemyMaxHealth = enemy.health;
    while (playerHealth > 0 && enemyHealth > 0) {
        let action = "";
        while (action !== "1" && action !== "2" && action !== "3" && action !== "4") {
            const response = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'move',
                    message: `Choose your move:\n1. ${chosenMonstie.moves[0]}\n2. ${chosenMonstie.moves[1]}\n3. ${chosenMonstie.moves[2]}\n4. Capture ${enemy.name}\nEnter 1, 2, 3, or 4:`,
                }
            ]);
            action = response.move.trim();
        }
        switch (action) {
            //=======================================================================================================
            case "1":
                console.log(`\n${chosenMonstie.name} attacks for 2 damage!\n`);
                enemyHealth -= 2;
                const enemyTurn1 = await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn1.damage;
                enemyHealth = enemyTurn1.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "2":
                const damage = calculateElementDamage(chosenMonstie, enemy);
                console.log(`\n${chosenMonstie.name} uses ${chosenMonstie.moves[1]} for ${damage} damage!\n`);
                enemyHealth -= damage;
                const enemyTurn2 = await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn2.damage;
                enemyHealth = enemyTurn2.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "3":
                console.log(`\n${chosenMonstie.name} heals for 2 health!\n`);
                playerHealth += 2;
                const enemyTurn3 = await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn3.damage;
                enemyHealth = enemyTurn3.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "4":
                const capturableHealth = enemy.health * 0.3;
                if (enemyHealth > capturableHealth) {
                    console.log(`\n${enemy.name} is too healthy to capture! Reduce its health below ${capturableHealth} to capture it.\n`);
                    const enemyTurn4a = await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                    playerHealth -= enemyTurn4a.damage;
                    enemyHealth = enemyTurn4a.newEnemyHealth;
                    console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                }
                else if (team.length >= 6) {
                    console.log(`\nYour team is full! You cannot capture more monsties, greedy ka na nonoy.\n`);
                    const enemyTurn4b = await enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                    playerHealth -= enemyTurn4b.damage;
                    enemyHealth = enemyTurn4b.newEnemyHealth;
                    console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                }
                else {
                    console.log(`\nYou have captured ${enemy.name}!\n`);
                    enemy.health = enemyMaxHealth;
                    team.push(enemy);
                    return;
                }
                break;
            //=======================================================================================================
        }
        if (enemyHealth <= 0) {
            console.log(`\n${enemy.name} has been defeated! You win the battle!\n`);
            chosenMonstie.health = maxPlayerHealth;
            return;
        }
        if (playerHealth <= 0) {
            console.log(`\n${chosenMonstie.name} has been defeated! You lost the battle!\n`);
            return;
        }
    }
}
//=======================================================================================================
// Function for enemy's turn
export async function enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie) {
    const randomID = Math.floor(Math.random() * enemy.moves.length);
    const enemyMove = enemy.moves[randomID];
    let enemyDamage = 0;
    let newEnemyHealth = enemyHealth;
    switch (enemyMove) {
        case "attack":
            console.log(`\n${enemy.name} attacks for 2 damage!\n`);
            enemyDamage = 2;
            break;
        case "fire":
            console.log(`\n${enemy.name} uses fire!\n`);
            enemyDamage = await enemyElementDamage(enemy, chosenMonstie);
            break;
        case "water":
            console.log(`\n${enemy.name} uses water!\n`);
            enemyDamage = await enemyElementDamage(enemy, chosenMonstie);
            break;
        case "leaf":
            console.log(`\n${enemy.name} uses leaf!\n`);
            enemyDamage = await enemyElementDamage(enemy, chosenMonstie);
            break;
        case "heal":
            console.log(`\n${enemy.name} heals for 2 health!\n`);
            newEnemyHealth += 2;
            break;
    }
    return { damage: enemyDamage, newEnemyHealth };
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
//=======================================================================================================
// Element interaction for player attack
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
//# sourceMappingURL=Fighting.js.map