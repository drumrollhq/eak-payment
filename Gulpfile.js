'use strict';

const gulp = require('gulp');
const nodemon = require('nodemon');
const notifier = require('node-notifier');
const app = require('./package.json');

gulp.task('server:start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
        .on('start', function() {
            notifier.notify({
                'title': app.name,
                'message': 'Development server running'
            });
        })
        .on('restart', function() {
        notifier.notify({
            'title': app.name,
            'message': 'Development server reloaded'
        });
    });
});

gulp.task('default', ['server:start']);
