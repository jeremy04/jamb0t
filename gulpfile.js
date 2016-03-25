var gulp = require('gulp'),
    server = require('gulp-develop-server');

// defaul task
gulp.task('default', ['server:start'], function () {

    // watch server files for changes
    gulp.watch([ 
        './babel.js',
        './config/*.json',
        './app/app.js', 
        './app/src/server/**/*.js' 
    ]).on('change', server.restart);

});

// start server
gulp.task('server:start', function () {
    server.listen({
        path: './babel.js',
        env: {
            port: 3332,
            NODE_ENV: 'dev'
        }
    });
});
