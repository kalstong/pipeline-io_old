class InternalState {
    
    constructor() {
        this.variables = {}
        this.callbacks = {}
        this.functions = {}
        this.connections = {}
    }
}

class State {
    constructor() {
        if (!this.instance) {
            this.instance = new InternalState();
        }
        return this.instance;
    }
}

module.exports = new State();