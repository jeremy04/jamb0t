const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('gifs'),
    q = require('q');

function gifs (bot, data) {
    const term = data.message.replace('!gifs', ''),
        deferred = q.defer();

    request(`http:\/\/api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`, function (error, response, body) {
        const list = JSON.parse(body);

        if(!error && list.data[0]) {
           deferred.resolve([list.data[Math.floor(Math.random() * list.data.length)].images.fixed_height.url]);
        } else {
            deferred.reject();
        }
    });

    return deferred.promise;

}

module.exports = {

    command: '!gifs',
    handler: gifs,
    errorMessage: 'No gif found! :('

};
