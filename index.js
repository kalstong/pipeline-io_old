const path = require('path')
const { log, utils } = require(path.join(__dirname, 'lib'))
const package = require(path.join(__dirname, 'package.json'))


process.title = `pipeline-io`

log('boot').info(`Welcome to pipeline-io v.${package.version}!\nFor more information please visit ${package.homepage}`)

// Arguments
let arguments = {}
try {
    arguments = utils.parseArgv(process.argv, { 'pipeline': 'pipeline' }, 2)
} catch (_) {
    log('boot').warn('Failed to parse process arguments.')
}  

try {
    if (!arguments.pipeline) {
        log('pipeline').warn('No pipeline specified. Nothing to do, program will stop.')
        process.exit(0)
    }

    let pipelineFile = utils.openFileSync(arguments.pipeline.value)
    
    if (!pipelineFile) {
        log('boot').warn('Pipeline specified cannot be loaded. Nothing to do, program will stop.')
        process.exit(0)
    }

    let pipeline = JSON.parse(pipelineFile)

    // Parse pipeline
    // Run setup
    
} catch (err) {
    log('pipeline').error('Critical error. Program will stop.', err)
    process.exit(1)
}

process.on('unhandledRejection', function (err, promise) {
    log('pipeline').error('Critical error. Unhandled Rejection detected. Program will stop.', err)
    process.exit(1)
});