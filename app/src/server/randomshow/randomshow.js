const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('randomshows'),
    shows = require('./shows'),
    q = require('q');

function randomshow (bot, data) {
    const show = shows[Math.floor(Math.random() * shows.length)],
        deferred = q.defer(),
        result = `Uploader: ${show.Uploader} Show date: ${show.showDate} Venue: ${show.Venue} Url: ${show.url}`;

    deferred.resolve([result]);

    return deferred.promise;
    
}

module.exports = {

    command: '!randomshow',
    handler: randomshow,
    errorMessage: 'Error finding a show! :('

};