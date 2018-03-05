'use strict';

const gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('js', ['index'], function () {
    return gulp.src('./dist/temp/*.js')
        .pipe($.uglify())
        .pipe($.rev()) //文件名添加一段hash码
        .pipe(gulp.dest('./dist/js'))
        .pipe($.rev.manifest()) //储存文件对应的hash码的json
        .pipe($.rename('js-manifest.json')) //命名
        .pipe(gulp.dest('./dist/rev'))
});

// seajs模块化处理
gulp.task('index', function () {
    return gulp.src('./src/js/main.js')
        .pipe($.seajsCombo()) //处理模块化引用
        .pipe(gulp.dest('./dist/temp'))
});

gulp.task('css', function () {
    return gulp.src('./src/css/*.css')
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe($.cssmin())
        .pipe($.rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe($.rev.manifest())
        .pipe($.rename('css-mainfest.json'))
        .pipe(gulp.dest('./dist/rev'));
});

// 处理html
gulp.task('html', ['js', 'css'], function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src(['./dist/rev/*.json', './src/*.html'])
        .pipe($.revCollector({
            replaceReved: true
        }))
        .pipe($.htmlmin(options))
        .pipe(gulp.dest('./dist'));
});

// 清除
gulp.task('clean', function () {
    return gulp.src('./dist')
        .pipe($.clean());
});

// gulp.task('jsClean', function () {
//     return gulp.src('./dist/*/*.js')
//         .pipe($.clean());
// });

// gulp.task('htmlClean', function () {
//     return gulp.src('./dist/*.html')
//         .pipe($.clean());
// });

// gulp.task('cssClean', function () {
//     return gulp.src('./dist/css')
//         .pipe($.clean());
// });

// gulp.task('revClean', function () {
//     return gulp.src('./dist/rev')
//         .pipe($.clean());
// });

gulp.task('default', ['clean'], function () {
    gulp.start('html');
});