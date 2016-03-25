const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('commands'),
    _ = require('lodash'),
    c = [
        'type \"!jokes\" without the quotes to get a random joke',
        'type \"!catfacts\" without the quotes for a cat fact',
        'type \"!randomshow\" without the quotes to get a random Gratedul Dead related show and link',
        'type \"!gifs {search term}\" without the brackets',
        'type \"!urban {search term}\" without the brackets',
        'type \"!8ball {your question}\" without the brackets',
        'type \"!emojis {song}\" without the brackets (no spaces in the song title)',
        'type \"!setlist {dead|wsp|phish} {date mm\/dd\/yy}\" for the setlist to a show on a certain date. Band defaults to the Dead.'
    ],
    q = require('q');

function commands (bot, data) {
    const deferred = q.defer();

    deferred.resolve(c);

    return deferred.promise;
}

module.exports = {

    command: '!commands',
    handler: commands,
    errorMessage: 'Error getting commands! :O'

};
