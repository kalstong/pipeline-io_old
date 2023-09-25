import { isObject } from './lib/utils';
import { Variable } from './Variable';
import { PipelineStructureError, ConstructorError } from './Errors';
import { IPipeline } from "./interfaces/PipelineInterfaces";

export class Engine {
    private _pipeline: IPipeline;
    private _variables: Record<string, Variable> = {};

    constructor(pipeline: IPipeline) {
        this._pipeline = pipeline

        if (!isObject(this._pipeline)) {
            throw new PipelineStructureError('Invalid structure');
        }

        /* connections */

        /* variables */
        try {
            for (const vName in pipeline.variables) {
                this._variables[vName] = new Variable(
                    vName,
                    pipeline.variables[vName].initValue,
                    {
                        type: pipeline.variables[vName]?.type,
                        feed: pipeline.variables[vName]?.feed,
                        length: pipeline.variables[vName]?.length
                    }
                );
            }

        } catch (err) {
            console.log(err)
            
            if (err instanceof ConstructorError)
                throw err;
            else 
                throw new PipelineStructureError('Invalid variable definition', (err as Error));
        }

        /* callbacks */

        /* pipeline funcs */
    }

    public getPipeline() {
        return { ...this._pipeline };
    }

    public async start() {
        return Promise.resolve(new Error('Not implemented'));
    }

    public async stop() {
        return Promise.resolve(new Error('Not implemented'));
    }
}