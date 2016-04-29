/* 
* @Author: janmi
* @Date:   2015-07-04 17:22:00
* @Last Modified by:   anchen
* @Last Modified time: 2016-04-29 11:34:28
*/

var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'), 
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'), 
    browserSync = require("browser-sync"), 
    changed = require('gulp-changed'),
    imgmin = require('gulp-imagemin'),
    pngmin = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    css = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    base64 = require('gulp-base64'),
    img64 = require('gulp-img64');


    var SRC = 'src/';
    var DEST = 'dist/';
    var project = ['project','project2','project3'];

    gulp.task('less', function(){
        gulp.src('src/less/**/*.less', {base:'src/less'})
            .pipe(plumber())
            .pipe(changed('src/css',{extension: '.css'}))
            .pipe(less())
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest('src/css'))
    });

    gulp.task('watch', function(){
        var path = "src/less/*.less";
        gulp.watch(path,['less']);
    });

    gulp.task('server', ['less'], function(){
        browserSync.init({
            files: 'src/**/*.*',
            server: {
                baseDir: '.'
            }
        });
        var path = "src/less/*.less";
        gulp.watch(path,['less']);
        gulp.watch('*.html').on('change', browserSync.reload);
    });


    gulp.task('cleanCss', function(){
        gulp.src('dist/css/*')
            .pipe(clean());
    });

    gulp.task('cleanJs', function(){
        gulp.src('dist/js/*')
            .pipe(clean());

    });

    gulp.task('mincss', ['cleanCss'], function(){
        gulp.src('src/css/**/*.css')
            .pipe(cssver())
            .pipe(css({compatibility:'ie7'}))
            .pipe(rev())
            .pipe(gulp.dest('dist/css'))
    });

    gulp.task('minjs', ['cleanJs'], function(){
        gulp.src('src/js/**/*.js')
            .pipe(uglify({mangle:false}))
            .pipe(rev())
            .pipe(gulp.dest('dist/js'))
    });

    gulp.task('minimg',function(){
        gulp.src('src/img/**/*.{png,jpg,gif}')
            .pipe(cache(imgmin({use:[pngmin()]})))
            .pipe(gulp.dest('dist/img'));
        gulp.src('src/font/**/*.{eot,svg,ttf,woff}')
            .pipe(cache(imgmin({use:[pngmin()]})))
            .pipe(gulp.dest('dist/font'));
    });


    gulp.task('default',['minjs', 'mincss', 'minimg']);
    
    gulp.task('jshint', function(){
        gulp.src('src/js/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
    });

    gulp.task('baseCss', function(){
        gulp.src('src/css/**/*.css')
            .pipe(base64({
            baseDir: 'src/img/',
            extensions: ['svg', 'png', /\.png#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            // maxImageSize: 8*1024, // bytes,
            deleteAfterEncoding: false,
            debug: true}))
            .pipe(gulp.dest('src/css'));
    })

    gulp.task('baseImg', function(){
        gulp.src('src/html/**/*.html')
            .pipe(img64())
            .pipe(gulp.dest('src/html'));
    })