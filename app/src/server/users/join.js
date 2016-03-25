'use strict';

let Users = require(`app/src/server/common/sequelize/models`).users,
    logger = require(`app/src/server/common/util/logger`).logger('join'),
    Q = require('q'),
    util = require('util');

function join (data, bot) {
    logger.debug(`BEGIN join param=${util.inspect(data)}`);

    Users.findOne({
        where: {
            user_id: data.user.id
        }
    })
    .then(
        (user) => {
            if(user) {
                bot.sendChat(`Hey ${data.user.username}, dont be greedy, you are already signed up!`);
                logger.debug(`END join RESOLVED user exists user=${util.inspect(user.dataValues)}`);
            } else {
                addUser(data)
                    .then(
                        (user) => {
                            bot.sendChat(`Thanks for joining @${data.user.username}!`);
                            logger.debug(`END join RESOLVED ${util.inspect(user.dataValues)}`);
                        }
                    )
                    .catch(
                        (error) => {
                            bot.sendChat(`Sorry ${data.user.username}, there was an error.  Let @chooooons know!`);
                            logger.debug(error);
                        }
                    )
            }
        }
    )
    .catch(
        (error) => {
            bot.sendChat(`Sorry ${data.user.username}, there was an error.  Let @chooooons know!`);
            logger.error(error);
        }
    );
}

function addUser (data) {
    let deferred = Q.defer();

    Users.build({
        username: data.user.username,
        user_id: data.user.id,
        joined: new Date()
    })
    .save()
    .then(
        (user) => {
            if(user) {
                deferred.resolve(user)
            }
        }
    )
    .catch(
        (error) => deferred.resolve(error)
    );

    return deferred.promise;
}

module.exports = join;