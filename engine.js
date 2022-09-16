const isObject = require('lodash/isObject')
const { PipelineStructureError } = require('./lib/errors')

const state = require('./state');

async function load(pipeline) {

    if (!isObject(pipeline))
        return Promise.reject(new PipelineStructureError('Invalid structure',
            {
                expected: "object",
                got: pipeline
            }))

    /* connections */

    /* variables */

    /* callbacks */

    /* pipeline funcs */

    return Promise.resolve()
}

async function start(pipeline) {
    console.log('started')
    return Promise.resolve()
}

async function stop(pipeline) {
    console.log('stopped')
}


module.exports = {
    load,
    start,
    stop
}