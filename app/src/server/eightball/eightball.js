const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('eighball'),
    q = require('q'),
    predictions = require('./predictions');

function eightball (bot, data) {
    logger.debug('BEGIN eightball');

    let deferred = q.defer(),
        prediction = predictions[Math.floor(Math.random() * predictions.length)];

    if(prediction) {
        deferred.resolve(['Shake shake shake...', prediction]);
        logger.debug('END eightball RESOLVED');
    } else {
        deferred.reject();
        logger.debug('END eightball REJECT');
    }
    
    return deferred.promise;
}

module.exports = {

    command: '!8ball',
    handler: eightball,
    errorMessage: 'An error occured :/'
    
};
