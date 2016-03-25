const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('weather'),
    moment = require('moment'),
    q = require('q');

function weather (bot, data) {
    logger.debug('BEGIN weather');

    const zip = data.message.replace('!weather', '').trim(),
        zipRegEx = /(^\d{5}$)|(^\d{5}\-\d{4}$)/,
        deferred = q.defer();

    if (!zipRegEx.test(zip)) {
        deferred.reject(`Please enter a valid US zip code in XXXXX or XXXXX\-XXXX format`);
        logger.debug('END weather REJECTED');
        return;
    }

    request(`http:\/\/api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=e03084aa205184809bda2b63c2cc2900&units=imperial`, (error, response, body) => {
        if(!error) {
            let weather = JSON.parse(body);

            deferred.resolve([`Current temp in ${weather.name} is ${weather.main.temp} degrees with ${weather.weather[0].description}. High of ${weather.main.temp_max} and a low of ${weather.main.temp_min} today.`]);
            logger.debug('END weather RESOLVED');
        }
    });

    return deferred.promise;
}

module.exports = {

    command: '!weather',
    handler: weather,
    errorMessage: 'Error getting the weather report! :umbrella:'

};
