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

class PipelineStructureError extends Error {
    constructor(message, meta = undefined) {
        super(message);

        Error.captureStackTrace(this, PipelineStructureError);

        let proto = Object.getPrototypeOf(this);
        proto.name = 'PipelineStructureError';

        this.meta = meta;
    }

    toString() {
        if (this.meta)
            return `${this.stack}\n    ${util.inspect(this.meta, inspectOpts)}`;
            
        return `${this.stack}`;
    }
  }

  module.exports = {
    PipelineStructureError
  }