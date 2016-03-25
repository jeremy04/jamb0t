let DubAPI = require('DubApi'),
    logger = require(`app/src/server/common/util/logger`).logger('bot'),
    router = require(`app/src/server/common/util/router`),
    room = process.env.ROOM || 'justjambands';

new DubAPI({
    username: process.env.USERNAME, 
    password: process.env.PASSWORD 
},
    function(err, bot) {
    if (err) return logger.error(err);

    logger.info('Running DubAPI v' + bot.version);

    function connect() {
        bot.connect(room);
    }

    bot.on('connected', function(name) {
        logger.debug('Connected to ' + name);
    });

    bot.on('disconnected', function(name) {
        logger.warn('Disconnected from ' + name);

        setTimeout(connect, 15000);
    });

    bot.on('error', function(err) {
        logger.error(err);
    });

    bot.on(bot.events.chatMessage, function(data) {
        logger.debug(`${data.user.username}: ${data.message}`);
        router.route(bot, data);
    });

    bot.on('room_playlist-update', function (data) {
        // bot.updub();
    }); 

    // logger.debug(bot);

    connect();
});
