const YAML = require('yaml')
const { log, utils } = require('./lib')
const package = require('./package.json')
const engine = require('./engine')

// Boot and welcoming
process.title = `pipeline-io`
log('boot').info(`Welcome to pipeline-io v.${package.version}!\nFor more information please visit ${package.homepage}\n`)

// Load Arguments
let args = {}
try {
    args = utils.parseArgv(process.argv, { 'pipeline': 'pipeline' }, 2)
} catch (_) {
    log('boot').warn('Failed to parse process arguments.')
}  

// Load pipeline
try {
    if (!args.pipeline) {
        log('pipeline').warn('No pipeline specified. Nothing to do, program will stop.')
        process.exit(0)
    }

    let pipelineContent = utils.openFileSync(args.pipeline.value)
    
    if (!pipelineContent) {
        log('boot').warn('Pipeline specified cannot be loaded. Nothing to do, program will stop.')
        process.exit(0)
    }

    const pipelineObj = YAML.parse(pipelineContent)
    engine.load(pipelineObj)
    .then(() => {
        engine.start()
        .catch(err => {
            log('engine').error('Critical error. Pipeline start has failed.', err)
        })
    })
    .catch(err => {
        log('engine').error('Critical error. Pipeline load has failed.', err)
    })

} catch (err) {
    log('pipeline').error('Critical error. Program will stop.', err)
    process.exit(1)
}

process.on('unhandledRejection', function (err, promise) {
    log('pipeline').error('Critical error. Unhandled Rejection detected. Program will stop.', err)
    process.exit(1)
});