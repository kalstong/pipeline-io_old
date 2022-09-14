const path = require('path')
const { log } = require(path.join(__dirname, 'lib'))
const package = require(path.join(__dirname, 'package.json'))

try {
    process.title = `pipeline-io`

    log('boot').info(`Welcome to pipeline-io v.${package.version}!\nFor more information please visit ${package.homepage}`)

} catch (err) {
    process.exit(1)
}

process.on('unhandledRejection', function (err, promise) {
    process.exit(1)
});