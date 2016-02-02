var gulp = require('gulp'),
    server = require('gulp-develop-server');

// defaul task
gulp.task('default', ['server:start'], function () {

    // watch for changes
    gulp.watch( [ 
        './index.js',
        './config/*.json',
        './app/app.js', 
        './app/src/server/**/*.js' 
    ]).on('change', server.restart);

});

// start server
gulp.task('server:start', function () {
    server.listen({
        path: './index.js',
        env: {
            port: 3332,
            NODE_ENV: 'dev'
        }
    });
});