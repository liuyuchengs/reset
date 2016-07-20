
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cssMin = require("gulp-cssmin") //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件
var ts = require("gulp-typescript"); //编译typescript文件

var paths = {
    sass:{src:"public/stylesheets/src/*.scss",dest:"public/stylesheets/css"},
    cssMin:{src:"public/stylesheets/css/*.css",dest:"public/stylesheets/dest"},
    ug:{src:["public/javascripts/js/*.js","public/javascripts/js/*/*.js"],dest:"public/javascripts/dest"},
    tsc:{src:["public/javascripts/src/*.ts","public/javascripts/src/*/*.ts"],dest:"public/javascripts/js"},
}

/**
 * 编译前端sass
 */
gulp.task("sass",function(){
    return gulp.src(paths.sass.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.sass.dest));
})

/**
 * 压缩前端css
 */
gulp.task("cssMin",function(){
    return gulp.src(paths.cssMin.src)
        .pipe(cssMin())
        .pipe(gulp.dest(paths.cssMin.dest));
})

/**
 * 压缩前端js文件
 */
gulp.task("ug",function(){
    return gulp.src(paths.ug.src)
        .pipe(uglify({mangle:false,}))
        .pipe(gulp.dest(paths.ug.dest))
})

/**
 * 编译前端ts文件
 */
gulp.task("tsc",()=>{
    let tsResult = gulp.src(paths.tsc.src,{base:"public/javascripts/src"}).pipe(ts({
        module: "amd",
        target: "es5",
        declaration:false,
        noImplicitAny: true,
        sourceMap: true,
    }));
    return tsResult.js.pipe(gulp.dest(paths.tsc.dest));
})

//监视
gulp.task("watch",function(){
    gulp.watch(paths.sass.src,["sass"]);
    gulp.watch(paths.cssMin.src,["cssMin"]);
    gulp.watch(paths.ug.src,["ug"]);
    gulp.watch(paths.tsc.src,["tsc"]);
})

gulp.task("default",["watch"]);

