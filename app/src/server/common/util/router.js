'use strict';

let q = require('q'),
    logger = require(`app/src/server/common/util/logger`).logger('router'),
    routes = require('./routes'),
    _ = require('lodash');

function route (bot, data) {
    let message = data.message.split(' '),
        command = message[0],
        config = _.find(routes, { command });

    if(config) {
        const promise = config.handler(bot, data);
            
        promise.then (
            (result) => {
                if(!_.isArray(result)) {
                    result = [result];
                }
                _.forEach(result, (message) => bot.sendChat(message));
            })
            .fail (
                (error) => {
                    bot.sendChat(error || config.errorMessage);
                }
            );
    }
}

module.exports = {

    route
    
};
