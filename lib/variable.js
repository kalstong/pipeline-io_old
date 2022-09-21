const { EventEmitter } = require('events')
const { ConstructorError } = require('../lib/errors')
const cloneDeep = require('lodash/cloneDeep')
const isEqual = require('lodash/isEqual')

class Variable {
    constructor(name, initValue, options) {

        const ctxOptions = options //type, feed, length

        if (initValue === undefined)
            throw new ConstructorError(
                'Initial value must be defined', {
                variable: name,
                expected: "initValue",
                got: initValue
            })

        this.initValue = initValue;
        this.store = initValue;
        this.evtEmitter = new EventEmitter();
        this.evtSet = `on-${name}-set`;
        this.evtChange = `on-${name}-change`;


        return {
            get: this.getValue.bind(this),
            set: this.setValue.bind(this),
            evtSet: this.evtSet,
            evtChange: this.evtChange,
        };
    }

    setValue(value) {
        const old = cloneDeep(this.store)

        this.store = value;

        if (!isEqual(old, value))
            this.evtEmitter.emit(this.evtChange, this.store);

        this.evtEmitter.emit(this.evtSet, this.store);
    }

    getValue() {
        return cloneDeep(this.store);
    }
}

module.exports = {
    Variable
}