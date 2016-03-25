const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('emojis'),
    e = require('./emojis-list'),
    q = require('q');

function emojis (bot, data) {
    logger.debug('BEGIN emojis');

    const song = data.message.replace('!emojis', '').toLowerCase().trim(),
        emoji = e[song],
        deferred = q.defer();

    if(emoji) {
        deferred.resolve([emoji]);
        logger.debug('END emojis RESOLVED');
    } else {
        deferred.reject(e.default);
        logger.debug('END emojis REJECTED');
    }

    return deferred.promise;
}

module.exports = {

    command: '!emojis',
    handler: emojis,
    errorMessage: 'Emoji not found! :p'

};
