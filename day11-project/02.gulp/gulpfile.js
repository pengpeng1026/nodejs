const gulp = require('gulp')
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const concat = require('gulp-concat');
const { series, parallel } = require('gulp');
const connect = require('gulp-connect');//配置服务器
const { exec } = require('child_process');
const uglify = require('gulp-uglify') //压缩
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin')

// 配置Babel
gulp.task('babel', () =>
  gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    // 监视文件的更新
    .pipe(connect.reload())
);
// 配置browserify
gulp.task('browserify', function () {
  return gulp.src('./dist/js/index.js')
    .pipe(browserify({
      insertGlobals: true,
    }))
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())
});
// less配置
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())//将less文件编译成css文件
    .pipe(concat('all.css'))//将css文件合并成一个文件
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
});
// html配置 html直接将src里面的HTML文件写入dist里面，可以不用配置
gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
})
// 配置服务器
gulp.task('connect', function () {
  connect.server({
    port: 5050, //端口号
    root: ['./dist'], //默认路径
    livereload: true //自动刷新浏览器
  });
  exec('start http://127.0.0.1:5050')
  // 自动监视文件的修改，然后执行对应的任务
  gulp.watch('./src/inde.html', gulp.series(['html']))
  gulp.watch('./src/js/*.js', gulp.series(['js-dev']))
  gulp.watch('./src/less/*.less', gulp.series(['less']))
});
// js文件的压缩 uglify
gulp.task('uglify', function () {
  return gulp.src('./dist/js/build.js')
    .pipe(uglify())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest('./dist/js'))
});
// css文件的压缩
gulp.task('cssmin', function () {
  return gulp.src('./dist/css/all.css')
    .pipe(cssmin())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./dist/css'))
})
// html文件的压缩
gulp.task('htmlmin', function () {
  return gulp.src('./src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除空格换行符
      removeComments: true, // 去除注释
    }))
    .pipe(gulp.dest('./dist'))
})
// 整合任务
gulp.task('js-dev', gulp.series(['babel', 'browserify']))
// parallel()也可以整合任务，他不需要考虑顺序，优点是速度快
gulp.task('run', gulp.parallel(['js-dev', 'html', 'less']))

// 开发环境统一配置
gulp.task('watch', gulp.series(['run', 'connect']))

//生产环境统一配置
// 生产环境下，在没有整合html,css,js的情况下，先将这三个文件编译
gulp.task('js-prod',gulp.series(['js-dev','uglify']))
gulp.task('css-prod',gulp.series(['less','cssmin']))
// html文件不需要提前编译
//整合任务
gulp.task('build',gulp.parallel(['js-prod','css-prod','htmlmin']))