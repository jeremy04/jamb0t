const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('jokes'),
    q = require('q');

function jokes (bot, data) {
    const deferred = q.defer();
    request(`http:\/\/tambal.azurewebsites.net/joke/random`, function (error, response, body) {
        const joke = JSON.parse(body).joke;

        if(!error && joke) {
            deferred.resolve([joke]);
        } else {
            deferred.reject();
        }
    });
    return deferred.promise;
}

module.exports = {

    command: '!jokes',
    handler: jokes,
    errorMessage: 'Error getting a joke! :('

};