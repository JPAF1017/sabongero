import { team, monstie } from './Monstie.js';
import { fightStart } from './Fighting.js';
import { getChoiceInput, getNumericChoiceInput } from './Input.js';
//=======================================================================================================
// Function for displaying monsties
export function displayMonsties() {
    console.log("\n=== Your Team ===");
    if (team.length === 0) {
        console.log("You don't have any monsties in your team yet!");
    }
    else {
        team.forEach((monstie, index) => {
            console.log(`${index + 1}. ${monstie.name}`);
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
    const answer = await getChoiceInput('Type "fight" to battle or "flee" to run away:', ["fight", "flee"]);
    // Handle the player's choice
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
// Function for removing member from team
export async function removeMonstie() {
    if (team.length === 0) {
        console.log("You don't have any monsties in your team yet!\n");
        return;
    }
    else if (team.length === 1) {
        console.log(`You only have one monstie: ${team[0]?.name}.\n`);
        return;
    }
    else {
        console.log("Choose your monstie to remove:");
        team.forEach((monstie, index) => {
            console.log(`${index + 1}. ${monstie.name} (Health: ${monstie.health}) (Element: ${monstie.moves[1]})`);
        });
        // Choosing a monstie to remove
        const selectedIndex = await getNumericChoiceInput(`Choose a monstie to remove (1-${team.length}):`, 0, team.length - 1);
        // Remove the selected monstie
        const removedMonstie = team[selectedIndex];
        team.splice(selectedIndex, 1);
        console.log(`${removedMonstie?.name} has been removed from your team.\n`);
    }
}
//=======================================================================================================
//# sourceMappingURL=Commands.js.map