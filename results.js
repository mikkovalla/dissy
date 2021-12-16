// Return the results as an formatted object
const moment = require('moment')

function resultFormatter (username, result) {
    return {
        username,
        result,
        time: moment().utcOffset('+00:00').format('h:mm a')
    }
}

module.exports = resultFormatter