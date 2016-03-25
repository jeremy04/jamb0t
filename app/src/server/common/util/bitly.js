let bitly = require('bitly');

function shorten (url) {
    return bitly.shorten(url, (shortenedUrl) => {
            return shortenedUrl;
        })
        .fail(() => {
            return null;
        });
}


module.exports = shorten;