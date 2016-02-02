'use strict';

let log4js = require('log4js');

function configure () {
    log4js.configure('logger.conf.json');
}

function connectLogger(name) {
    return log4js.connectLogger(log4js.getLogger(name), { 
        level: 'auto',
        format: ':method :url :status'
    });
}

function logger (name) {
    return log4js.getLogger(name);
}

module.exports = {

    configure,
    connectLogger,
    logger

};