const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('catfacts'),
    q = require('q');

function catfacts (bot, data) {
    const deferred = q.defer();
    request('http://catfacts-api.appspot.com/api/facts', (error, response, body) => {
        if(!error) {
            deferred.resolve([JSON.parse(response.body).facts[0]]);
        }
    });

    return deferred.promise;
}

module.exports = {

    command: '!catfacts',
    handler: catfacts,
    errorMessage: 'Error getting cat facts! :cat:'

};
