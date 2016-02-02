let express = require('express'),
    http = require('http'),
    models = require('src/server/common/sequelize/models'),
    log4jamb0t = require('src/server/common/util/logger'),
    logger;

log4jamb0t.configure();
logger = log4jamb0t.logger('app');

const app = express();

/* Get port from environment and store in Express. */
app.set('port', process.env.PORT || 3332);

models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function () {
        logger.debug('jamb0t listening on port ' + server.address().port + '. NODE_ENV=' + process.env.NODE_ENV);
    });
});
