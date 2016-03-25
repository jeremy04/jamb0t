const request = require('request'),
    logger = require(`app/src/server/common/util/logger`).logger('mlb'),
    teams = require('./teams'),
    util = require('util'),
    _ = require('lodash'),
    moment = require('moment'),
    q = require('q');

function mlb (bot, data) {
    logger.debug('BEGIN mlb');

    const deferred = q.defer(),
        command = data.message.replace('!mlb', '').trim().split(' '),
        team = command[0] ? command[0].toUpperCase() : null,
        teamRegEx = /^[a-z]{2,3}$/i,
        date = moment(new Date()).format('yyyymmdd');

        let teamId;

    if(team && teamRegEx.test(team)) {
        teamId = _.find(teams, { abbreviation: team });
        if(teamId) {
            let userAgent = util.format('xmlstats-exnode/%s (%s)', 1.0, 'kyle.alan.hanson@gmail.com'),
            options = {
                url: `https:\/\/erikberg.com\/mlb\/results\/${teamId.team_id}.json?season=${moment(new Date()).format('yyyy')}`,
                headers: {
                    'Authorization': util.format('Bearer %s' ,'cacf0545-db65-4fe8-999c-a51a4607a88c'),
                    'User-Agent': userAgent
                }
            };

            request(options, (error, response) => {
                if(!error) {
                    const teamResults = JSON.parse(response.body);
                    logger.debug(util.inspect(teamResults));
                    deferred.resolve([
                        'MLB stats is still in beta and only regular season data is available.  Things will change soon as updates are made to the API.',
                        `The last ${teamResults[0].event_season_type} season game the ${teamResults[0].team.full_name} played was against the ${teamResults[0].opponent.full_name} on ${moment(new Date(teamResults[0].event_start_date_time)).format('MM-DD-YYYY')}. The score was ${teamResults[0].team.full_name}: ${teamResults[0].team_points_scored} ${teamResults[0].opponent.full_name}: ${teamResults[0].opponent_points_scored}.`
                    ]);
                } else {
                    deferred.reject();
                }
                
            });
        } else {
            deferred.reject();
        }
    } else {
        deferred.reject('Please use the command \"!mlb {identifier}\". See http://bit.ly/1Pu4eG6 for all team abbreviations');
        // return;
    }

    return deferred.promise;

}

module.exports = {

    command: '!mlb',
    handler: mlb,
    errorMessage: 'Error getting MLB data! :('

};
