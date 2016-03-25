const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('setlist'),
    moment = require('moment'),
    _ = require('lodash'),
    async = require('async'),
    q = require('q');

function setlist (bot, data) {
    logger.debug('BEGIN setlist');

    let date = data.message.replace('!setlist', '').trim(),
        dateRegEx = /([0-9]{2}\-){2}[0-9]{4}/,
        bandRegEx = /(dead|phish|wsp)/g,
        mbid = {
            'dead': '6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6',
            'phish': 'e01646f2-2a04-450d-8bf2-0d993082e058',
            'wsp': '3797a6d0-7700-44bf-96fb-f44386bc9ab2'
        },
        bandMbid,
        command = date.split(' '),
        deferred = q.defer();

    if (bandRegEx.test(command[0])) {
        bandMbid = mbid[command[0]];
        date = moment(new Date(command[1])).format('DD-MM-YYYY');
    } else {
        bandMbid = mbid['dead'];
        date = moment(new Date(command[0])).format('DD-MM-YYYY');
    }

    if(!dateRegEx.test(date)) {
        deferred.reject('Please use the MM/DD/YY format for setlists!');
        logger.debug('END setlist REJECTED');
        return;
    }

    request(`http:\/\/api.setlist.fm\/rest\/0.1\/search\/setlists.json?artistMbid=${bandMbid}&date=${date}`, (error, response, body) => {
        if(!error) {
            if(body.trim() === 'not found') {
                deferred.reject();
                logger.debug('END setlist REJECTED');
                return;
            }

            let sl = JSON.parse(body).setlists.setlist,
                encoreCount = 0,
                outerCount = 0,
                messages = [];

            if (sl.sets){
                if(!_.isArray(sl.sets.set)) {
                    sl.sets.set = [sl.sets.set];
                }
            } else {
                deferred.reject();
                logger.debug('END setlist REJECTED');
                return;
            }

            messages.push(`Venue: ${sl.venue['@name']} Location: ${sl.venue.city['@name']}, ${sl.venue.city['@stateCode']}`);

            async.each(sl.sets.set, (value, cb) => {
                let result = '',
                    innerCount = 0;
                result += `Set ${outerCount + 1}: `;
                outerCount++;
                async.each(value.song, (value, cb) => {
                    if(value['@name']) {
                        result += `${innerCount + 1}. ${value['@name']} `;
                        innerCount++;
                    } else {
                        result += `${encoreCount + 1}. ${value} `;
                        encoreCount++;
                    }
                    cb();
                });
                messages.push(result);
                cb();
            }, (error) => {
                deferred.resolve(messages);
                logger.debug('END setlist RESOLVED');
            });
        }
    });

    return deferred.promise;
}

module.exports = {

    command: '!setlist',
    handler: setlist,
    errorMessage: 'Setlist not found! :/'

};
