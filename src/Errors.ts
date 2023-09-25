class BaseError extends Error {
    meta?: unknown;

    constructor(message: string, meta?: unknown) {
        super(message);

        // Error.captureStackTrace(this, BaseError);
        
        const proto = Object.getPrototypeOf(this);
        proto.name = 'BaseError';

        this.meta = meta;
    } 
}

export class ConstructorError extends BaseError {
    constructor(message: string, meta?: unknown) {
        super(message, meta);

        // Error.captureStackTrace(this, ConstructorError);

        const proto = Object.getPrototypeOf(this);
        proto.name = 'ConstructorError';

    }
}

export class PipelineStructureError extends BaseError {
    constructor(message: string, meta?: unknown) {
        super(message, meta);

        // Error.captureStackTrace(this, PipelineStructureError);

        const proto = Object.getPrototypeOf(this);
        proto.name = 'PipelineStructureError';

    }
}

module.exports = {
    ConstructorError,
    PipelineStructureError
}