

module.exports = function (bot) {
    
    router
        .route(bot, {
            regex: /!gifs/,
            handler: gifs,
            errorMessage: 'Couln\'t find the gif! :p'
        });

}

function router (bot) {
    bot.on('chat-message', (data) => {
        let message = data.message.split(' '),
            command = message[0].trim(),
            config =  _.find(routes, { regex: command });

        if(config) {
            config.handler(message)
                .then((result) => {
                    bot.sendChat(result)
                })
                .fail(() => {
                    bot.sendChat(config.errorMessage);
                });
        }

    });
}