const path = require('path')

module.exports = {
    log: require(path.join(__dirname, 'logger')),
    utils: require(path.join(__dirname, 'utils')),
    errors: require(path.join(__dirname, 'errors'))
}
