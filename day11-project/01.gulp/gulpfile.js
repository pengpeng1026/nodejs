const { series, parallel } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect')
const { exec } = require('child_process');//配置自动打开浏览器
const uglify = require('gulp-uglify')  //压缩js文件
const cssmin = require('gulp-cssmin'); //压缩css文件
const htmlmin = require('gulp-htmlmin'); //压缩html文件

gulp.task('babel', () =>    //babel 任务名称
  gulp.src('./src/js/*js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())  //自动刷新配置
);

// Basic usage
gulp.task('browserify', function () {
  // Single entry point to browserify
  return gulp.src('./dist/js/index.js')
    .pipe(browserify({
      insertGlobals: true,
    }))
    .pipe(rename('build.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())
});

// less任务

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
});

// html任务
gulp.task('html', function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
})

// 配置服务器
gulp.task('connect', function () {
  connect.server({
    port: 3030,  //端口号
    root: ['./dist'], //暴露目录
    livereload: true
  });
  exec('start http://127.0.0.1:3030') //自动打开浏览器
  // 当修改src里面的文件，监视自动改变
  gulp.watch('./src/index.html', gulp.series(['html']))
  gulp.watch('./src/less/*.less', gulp.series(['less']))
  gulp.watch('./src/js/*.js', gulp.series(['js-dev']))
})
// js的压缩
gulp.task('uglify', function () {
  return gulp
    .src("./dist/js/build.js")
    .pipe(uglify())
    .pipe(rename("build.min.js"))
    .pipe(gulp.dest("./dist/js"))
})
// css的压缩
gulp.task('cssmin', function () {
  return gulp
    .src('./dist/css/all.css')
    .pipe(cssmin())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./dist/css'))
})
//html的压缩
gulp.task('htmlmin', function () {
  return gulp
    .src('./src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,//删除空格
      removeComments: true  //删除注释
    }))
    .pipe(gulp.dest('./dist'))
})

// series()可以整合多条命令，并且按照顺序依次执行
gulp.task('js-dev', series(['babel', 'browserify']))

gulp.task('dev', parallel(['js-dev', 'html', 'less']))
// 开发环境统一配置
gulp.task('watch', gulp.series(['dev', 'connect']))
//生产环境的统一配置
gulp.task("js-prod", series(['js-dev', 'uglify']))
gulp.task("css-prod", series(['less', 'cssmin']))
gulp.task("build", parallel(['js-prod', 'css-prod', 'htmlmin']))