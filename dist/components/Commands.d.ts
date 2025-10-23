import type { MonstieStat } from './Monstie.js';
export declare function displayMonsties(): void;
export declare function encounterMonstie(): Promise<void>;
export declare function fightStart(enemy: MonstieStat): Promise<void>;
export declare function fightScene(chosenMonstie: MonstieStat, enemy: MonstieStat): Promise<void>;
export declare function enemyTurn(enemy: MonstieStat, playerHealth: number, enemyHealth: number, chosenMonstie: MonstieStat): Promise<void>;
//# sourceMappingURL=Commands.d.ts.map