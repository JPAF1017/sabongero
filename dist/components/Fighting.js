import { inputHandler } from './Input.js';
import { team } from './Monstie.js';
//=======================================================================================================
// Function choosing a monstie for fighting
export async function fightStart(enemy) {
    if (team.length === 0) {
        console.log("You don't have any monsties to fight with!");
        return;
    }
    // Display available monsties and let user choose
    const teamChoices = team.map(monstie => `${monstie.name} (Health: ${monstie.health}) (Element: ${monstie.moves[1]})`);
    const selectedIndex = await inputHandler.getChoiceInput("Choose your monstie for battle:", teamChoices, 1);
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
        const action = await inputHandler.getValidatedInput(`Choose your move:\n1. ${chosenMonstie.moves[0]}\n2. ${chosenMonstie.moves[1]}\n3. ${chosenMonstie.moves[2]}\n4. Capture ${enemy.name}\nEnter 1, 2, 3, or 4:`, {
            validAnswers: ["1", "2", "3", "4"],
            errorMessage: "Please enter 1, 2, 3, or 4"
        });
        switch (action) {
            //=======================================================================================================
            case "1":
                console.log(`\n${chosenMonstie.name} attacks for 2 damage!\n`);
                enemyHealth -= 2;
                const enemyTurn1 = enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn1.damage;
                enemyHealth = enemyTurn1.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "2":
                const damage = calculateElementDamage(chosenMonstie, enemy);
                console.log(`\n${chosenMonstie.name} uses ${chosenMonstie.moves[1]} for ${damage} damage!\n`);
                enemyHealth -= damage;
                const enemyTurn2 = enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn2.damage;
                enemyHealth = enemyTurn2.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "3":
                console.log(`\n${chosenMonstie.name} heals for 2 health!\n`);
                playerHealth += 2;
                const enemyTurn3 = enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                playerHealth -= enemyTurn3.damage;
                enemyHealth = enemyTurn3.newEnemyHealth;
                console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                break;
            //=======================================================================================================
            case "4":
                // Capture logic
                const capturableHealth = enemy.health * 0.3;
                // Stops capturing if enemy health is above 30%
                if (enemyHealth > capturableHealth) {
                    console.log(`\n${enemy.name} is too healthy to capture! Reduce its health below ${capturableHealth} to capture it.\n`);
                    const enemyTurn4a = enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                    playerHealth -= enemyTurn4a.damage;
                    enemyHealth = enemyTurn4a.newEnemyHealth;
                    console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                    // Stops player from capturing more than 6 monsties
                }
                else if (team.length >= 6) {
                    console.log(`\nYour team is full! You cannot capture more monsties, greedy ka na nonoy.\n`);
                    const enemyTurn4b = enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie);
                    playerHealth -= enemyTurn4b.damage;
                    enemyHealth = enemyTurn4b.newEnemyHealth;
                    console.log(`\nPlayer Health: ${playerHealth} | Enemy Health: ${enemyHealth}\n`);
                    // Successful capture
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
//=======================================================================================================
// Function for enemy's turn
export function enemyTurn(enemy, playerHealth, enemyHealth, chosenMonstie) {
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
            enemyDamage = calculateElementDamage(enemy, chosenMonstie);
            break;
        case "water":
            console.log(`\n${enemy.name} uses water!\n`);
            enemyDamage = calculateElementDamage(enemy, chosenMonstie);
            break;
        case "leaf":
            console.log(`\n${enemy.name} uses leaf!\n`);
            enemyDamage = calculateElementDamage(enemy, chosenMonstie);
            break;
        case "heal":
            console.log(`\n${enemy.name} heals for 2 health!\n`);
            newEnemyHealth += 2;
            break;
    }
    return { damage: enemyDamage, newEnemyHealth };
}
//=======================================================================================================
//=======================================================================================================
// Elemental damage calculation
function calculateElementDamage(attacker, defender) {
    const strongDamage = 4;
    const weakDamage = 1;
    const attackerElement = attacker.moves[1];
    const defenderElement = defender.moves[1];
    // Element effectiveness: fire > leaf > water > fire
    if (attackerElement === "fire" && defenderElement === "leaf") {
        return strongDamage;
    }
    else if (attackerElement === "leaf" && defenderElement === "water") {
        return strongDamage;
    }
    else if (attackerElement === "water" && defenderElement === "fire") {
        return strongDamage;
    }
    else {
        return weakDamage;
    }
}
//=======================================================================================================
//# sourceMappingURL=Fighting.js.map