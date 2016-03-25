const logger = require(`app/src/server/common/util/logger`).logger('images'),
    Search = require('imgur-search'),
    q = require('q'),
    imgurSearch = new Search('ef411a24d840efa');

function img (bot, data) {
    const term = data.message.replace('!images', '').trim(),
        deferred = q.defer();

    imgurSearch.getRandomFromSearch(`${term}+ext:jpg`, null, null)
        .then((response) => {
            if(response.link) {
                deferred.resolve([response.link]);
            } else {
                deferred.reject();
            }
        })
        .fail((error) => {
            deferred.reject();
        });

    return deferred.promise;
}

module.exports = {

    command: '!images',
    handler: img,
    errorMessage: 'No image found :('

};
