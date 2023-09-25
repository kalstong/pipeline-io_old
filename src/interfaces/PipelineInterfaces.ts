export interface IConnection {}

export interface IVariable {
    length: number | undefined;
    feed: string | undefined;
    type: string | undefined;
    initValue: unknown;
}

export interface ICallback {}

export interface IFlow {}

export interface IPipeline {
    connections: IConnection[];
    variables: IVariable[];
    callbacks: ICallback[];
    start: string[];
    pipeline: IFlow[];
}