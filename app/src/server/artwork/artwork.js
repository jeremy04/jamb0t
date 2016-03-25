const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('artwork'),
    q = require('q');

function artwork (bot, data) {
    const media = bot.getMedia(),
        deferred = q.defer();

    if (media.images.thumbnail) {
        deferred.resolve([media.images.thumbnail]);
    } else {
        deferred.reject();
    }

    return deferred.promise;
}

module.exports = {

    command: '!artwork',
    handler: artwork,
    errorMessage: 'Couldn\'t find the artwork for this chooooon! :('

};
