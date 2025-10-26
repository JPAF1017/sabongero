import type { MonstieStat } from './Monstie.js';
export declare function fightStart(enemy: MonstieStat): Promise<void>;
export declare function fightScene(chosenMonstie: MonstieStat, enemy: MonstieStat): Promise<void>;
export declare function enemyTurn(enemy: MonstieStat, playerHealth: number, enemyHealth: number, chosenMonstie: MonstieStat): {
    damage: number;
    newEnemyHealth: number;
};
//# sourceMappingURL=Fighting.d.ts.map