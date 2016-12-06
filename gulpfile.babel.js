import 'localenv';
import App from './package.json';
import Gulp from 'gulp';
import Del from 'del';
import BrowserSync  from 'browser-sync';
import Browserify  from 'browserify';
import Source from 'vinyl-source-stream';
import Buffer  from 'vinyl-buffer';
import Uglify  from 'gulp-uglify';
import EsLint from 'gulp-eslint';
import Sass from 'gulp-sass';
import SourceMaps  from 'gulp-sourcemaps';
import Concat from 'gulp-concat';
import Envify from 'envify';
import Sequence from 'run-sequence';
import HistoryFallback from 'connect-history-api-fallback';

Gulp.task('default', ['watch']);

Gulp.task('watch', ['dev'], function () {
    Gulp.watch(App.paths.js, ['js:lint', 'js', BrowserSync.reload]);
    Gulp.watch(App.paths.scss, ['sass', BrowserSync.reload]);
});

Gulp.task('clean', function () {
    return Del(['./build/**/*']);
});

Gulp.task('dev', (done) => {
    Sequence('clean', ['assets', 'js', 'sass'], 'serve', done);
});

Gulp.task('build', (done) => {
    Sequence('clean', ['assets', 'js:min', 'sass:min'], done);
});

Gulp.task('serve', function () {
    return BrowserSync({
        browser: "google chrome",
        server: {
            baseDir   : App.paths.build.dist,
            middleware: [
                HistoryFallback()
            ]
        }
    });
});

Gulp.task('sass', function () {
    return Gulp.src(App.paths.scss)
        .pipe(SourceMaps.init())
        .pipe(Sass())
        .pipe(Concat('app.css'))
        .pipe(SourceMaps.write())
        .pipe(Gulp.dest(App.paths.build.css));
});

Gulp.task('sass:min', function () {
    return Gulp.src(App.paths.scss)
        .pipe(SourceMaps.init())
        .pipe(Sass({outputStyle: 'compressed'}))
        .pipe(Concat('app.css'))
        .pipe(SourceMaps.write())
        .pipe(Gulp.dest(App.paths.build.css));
});

Gulp.task('js', function () {
    return Browserify(App.paths.app)
        .transform('babelify', {presets: ["es2015", "react", "stage-2"]})
        .transform(Envify)
        .bundle()
        .pipe(Source(App.paths.app))
        .pipe(Buffer())
        .pipe(Concat('app.js'))
        .pipe(Gulp.dest(App.paths.build.js));
});

Gulp.task('js:min', function () {
    return Browserify(App.paths.app)
        .transform('babelify', {presets: ["es2015", "react", "stage-2"]})
        .transform(Envify)
        .bundle()
        .pipe(Source(App.paths.app))
        .pipe(Buffer())
        .pipe(SourceMaps.init())
        .pipe(Uglify({mangle: false}))
        .pipe(Concat('app.js'))
        .pipe(SourceMaps.write())
        .pipe(Gulp.dest(App.paths.build.js));
});

Gulp.task('js:lint', function () {
    return Gulp.src(App.paths.js)
        .pipe(EsLint())
        .pipe(EsLint.format())
        .pipe(EsLint.failAfterError());
});

Gulp.task('assets', function () {
    Gulp.src(App.paths.assets).pipe(Gulp.dest(App.paths.build.dist));
});


