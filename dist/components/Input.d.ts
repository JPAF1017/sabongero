export interface InputPrompt {
    type: string;
    name: string;
    message: string;
    choices?: string[];
}
export interface InputOptions {
    validAnswers?: string[];
    parseAsNumber?: boolean;
    minValue?: number;
    maxValue?: number;
    errorMessage?: string;
}
export declare class InputHandler {
    getInput(message: string): Promise<string>;
    getValidatedInput(message: string, options?: InputOptions): Promise<string>;
    getNumberInput(message: string, options?: InputOptions): Promise<number>;
    getChoiceInput(message: string, choices: string[], startIndex?: number): Promise<number>;
    getCommandInput(): Promise<string>;
}
export declare const inputHandler: InputHandler;
//# sourceMappingURL=Input.d.ts.map