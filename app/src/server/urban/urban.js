const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('urban'),
    q = require('q');

function urban (bot, data) {
    const term = data.message.replace('!urban', ''),
        deferred = q.defer();

    request.get(`http:\/\/api.urbandictionary.com/v0/define?term=${term}`, function (error, response) {
        const list = JSON.parse(response.body).list;

        if(!error && list.length) {
            deferred.resolve([list[0].definition]);
        } else {
            deferred.reject();
        }
        
    });

    return deferred.promise;
}

module.exports = {

    command: '!urban',
    handler: urban,
    errorMessage: 'Didn\'t find a definition! :('

};
