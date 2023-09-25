import { ConstructorError } from "./Errors";

export class Variable {
    private _name: string;
    private initValue: unknown | undefined;
    private opts: { type?: string | undefined; feed?: string | undefined; length?: number | undefined; } | undefined;

    constructor(name: string, initValue?: unknown, opts?: { type?: string; feed?: string; length?: number }) {
        this._name = name;
        this.initValue = initValue;
        this.opts = opts;

        if (initValue === undefined)
        throw new ConstructorError(
            'Initial value must be defined', {variable: name})
    }

    public getName() {
        return this._name;
    }
}