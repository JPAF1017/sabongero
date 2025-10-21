import * as readline from "readline";
// Collection of Monsties
const monsties = [
    { id: 1, name: "Rommeller", moves: ["attack", "fire", "heal"] },
    { id: 2, name: "Kinit", moves: ["attack", "water", "heal"] },
    { id: 3, name: "Kinit", moves: ["attack", "leaf", "heal"] },
];
// Create a readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Function to ask for input
function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}
// Main function
(async () => {
    let answer = "";
    console.log("What do you want to do?");
    // monsties.forEach((m) => console.log(`${m.id}. ${m.name}`));
    // const idInput = await ask("Enter the ID of the monstie you want to rename: ");
    // const monstie = monsties.find((m) => m.id === Number(idInput));
    // if (!monstie) {
    //   console.log("❌ Monstie not found!");
    //   rl.close();
    //   return;
    // }
    // const newName = await ask(`Enter a new name for ${monstie.name}: `);
    // monstie.name = newName;
    // console.log("\nMonstie renamed successfully!");
    // console.log("Updated Monsties:");
    // monsties.forEach((m) => console.log(`${m.id}. ${m.name}`));
    if (answer === "list") {
        monsties.forEach((m) => console.log(`${m.id}. ${m.name}`));
    }
    rl.close();
})();
//# sourceMappingURL=index.js.map