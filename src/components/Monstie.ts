// Monstie stats
export interface MonstieStat {
  id: number;
  level: number;
  health: number;
  name: string;
  moves: string[];
}

// Team of monsties
export const team: MonstieStat[] = [];

// Collection of Monstie
export const monstie: MonstieStat[] = [
  { id: 1, level: 1, health: 10, name: "Rommeller", moves: ["attack", "fire", "heal"] },
  { id: 2, level: 1, health: 10, name: "TheMyle", moves: ["attack", "water", "heal"] },
  { id: 3, level: 1, health: 10, name: "Kinit", moves: ["attack", "leaf", "heal"] },
  { id: 4, level: 1, health: 10, name: "Paolito", moves: ["attack", "leaf", "heal"] },
];