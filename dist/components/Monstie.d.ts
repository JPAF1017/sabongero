export interface MonstieStat {
    id: number;
    level: number;
    health: number;
    name: string;
    moves: string[];
}
export declare const team: MonstieStat[];
export declare const monstie: MonstieStat[];
export declare function selectStarterMonstie(): Promise<void>;
//# sourceMappingURL=Monstie.d.ts.map