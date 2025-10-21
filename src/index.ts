import * as readline from "readline";

//Monstie stats
interface MonstieStat {
  id: number;
  name: string;
  moves: string[];
}

//Collection of Monstie
const monsties: MonstieStat[] = [
  { id: 1, name: "Rommeller", moves: ["attack", "fire", "heal"] },
  { id: 2, name: "Kinit", moves: ["attack", "water", "heal"] },
  { id: 3, name: "Kinit", moves: ["attack", "leaf", "heal"] },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter your name: ", (name) => {
  console.log(`Hello, ${name}!`);
  rl.close();
});