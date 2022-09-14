const path = require('path')
const { cwd } = require('process')
const { log } = require(path.join(__dirname, 'lib'))

try {
    process.title = `pipeline-io`


    console.log(`Welcome to pipeline-io! `)
    

} catch (err) {
    process.exit(1)
}

process.on('unhandledRejection', function (err, promise) {
    process.exit(1)
});