const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('images'),
    Search = require('imgur-search'),
    search = new Search('ef411a24d840efa'),
    q = require('q');

function nsfw (bot, data) {
    logger.debug('BEGIN nsfw');

    const term = data.message.replace('!images', '').trim(),
        deferred = q.defer();

    search.getRandomFromAlbum(`cwXza`)
        .then((response) => {
            if(response.link) {
                deferred.resolve([response.link]);
                logger.debug('END nsfw RESOLVED');
            } else {
                deferred.reject();
                logger.debug('END nsfw REJECTED');
            }
        })
        .fail((error) => {
            deferred.reject();
            logger.debug('END nsfw REJECTED');
        });

    return deferred.promise;
}

module.exports = {

    command: '!nsfw',
    handler: nsfw,
    errorMessage: 'No image found! :('

};