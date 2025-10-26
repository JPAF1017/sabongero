export interface InputPromptConfig {
    message: string;
    name?: string;
    type?: 'input' | 'list' | 'confirm';
}
export declare function getInput(config: InputPromptConfig): Promise<string>;
export declare function getCommandInput(): Promise<string>;
export declare function getChoiceInput(message: string, validChoices: string[], caseSensitive?: boolean): Promise<string>;
export declare function getNumericChoiceInput(message: string, min: number, max: number): Promise<number>;
export declare function getFightMoveInput(moves: string[], enemyName: string): Promise<string>;
//# sourceMappingURL=Input.d.ts.map