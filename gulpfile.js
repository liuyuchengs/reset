
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cssMin = require("gulp-cssmin") //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件
var ts = require("gulp-typescript"); //编译typescript文件

var paths = {
    sass:{src:"public/stylesheets/src/*.scss",dest:"public/stylesheets/css"},
    cssMin:{src:"public/stylesheets/css/*.css",dest:"public/stylesheets/dest"},
    pug:{src:"public/javascripts/js/*.js",dest:"public/javascripts/dest"},
    pugControll:{src:"public/javascripts/js/controller/*.js",dest:"public/javascripts/dest/controller"},
    pugModule:{src:"public/javascripts/js/modules/*.js",dest:"public/javascripts/dest/modules"},
}

/**
 * 编译sass
 */
gulp.task("sass",function(){
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.sass.dest));
})

/**
 * 压缩css
 */
gulp.task("cssMin",function(){
    return gulp.src(paths.cssMin.src)
        .pipe(cssMin())
        .pipe(gulp.dest(paths.cssMin.dest));
})

/**
 * 压缩dest下的js
 */
gulp.task("pug",function(){
    return gulp.src(paths.pug.src)
        .pipe(uglify({mangle:false,}))
        .pipe(gulp.dest(paths.pug.dest))
})

/**
 * 压缩dest/module下的js
 */
gulp.task("pugModule",function(){
    return gulp.src(paths.pugModule.src)
        .pipe(uglify({mangle:false,}))
        .pipe(gulp.dest(paths.pugModule.dest))
})

/**
 *  压缩dest/controller下的js
 */
gulp.task("pugControll",function(){
    return gulp.src(paths.pugControll.src)
        .pipe(uglify({mangle:false,}))
        .pipe(gulp.dest(paths.pugControll.dest))
})

//监视
gulp.task("watch",function(){
    gulp.watch(paths.sass.src,["sass"]);
    gulp.watch(paths.cssMin.src,["cssMin"]);
    gulp.watch(paths.pug.src,["pug"]);
    gulp.watch(paths.pugModule.src,["pugModule"]);
    gulp.watch(paths.pugControll.src,["pugControll"]);
})

gulp.task("default",["watch"]);

