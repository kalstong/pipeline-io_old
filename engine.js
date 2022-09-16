const isObject = require('lodash/isObject')
const { PipelineStructureError, ConstructorError } = require('./lib/errors')
const { Variable } = require('./lib/variable')

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
    try {
        for (const vName in pipeline.variables) {
            state.variables[vName] = new Variable(vName,
                pipeline.variables[vName]?.initValue, {
                type: pipeline.variables[vName]?.type,
                feed: pipeline.variables[vName]?.feed,
                length: pipeline.variables[vName]?.length
            })
        }
    } catch (err) {
        if (err instanceof ConstructorError)
            return Promise.reject(err)
        else 
            return Promise.reject(new PipelineStructureError('Invalid variable definition', err))
    }

    /* callbacks */

    /* pipeline funcs */

    console.log(state)

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