const util = require("util");

const inspectOpts = {
    breakLength: Infinity,
    colors: false,
    compact: true,
    customInspect: false,
    depth: 5,
    showHidden: false,
    sorted: false
};

class BaseError extends Error {
    constructor(message, meta = undefined) {
        super(message);

        Error.captureStackTrace(this, BaseError);
        
        let proto = Object.getPrototypeOf(this);
        proto.name = 'BaseError';

        this.meta = meta;
    }

    toString() {
        if (this.meta)
            return `${this.stack}\n    ${util.inspect(this.meta, inspectOpts)}`;

        return `${this.stack}`;
    }    
}

class ConstructorError extends BaseError {
    constructor(message, meta = undefined) {
        super(message, meta);

        Error.captureStackTrace(this, ConstructorError);
        
        let proto = Object.getPrototypeOf(this);
        proto.name = 'ConstructorError';

    }
}

class PipelineStructureError extends BaseError {
    constructor(message, meta = undefined) {
        super(message, meta);

        Error.captureStackTrace(this, PipelineStructureError);

        let proto = Object.getPrototypeOf(this);
        proto.name = 'PipelineStructureError';

    }
}

module.exports = {
    ConstructorError,
    PipelineStructureError
}