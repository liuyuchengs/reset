
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cssMin = require("gulp-cssmin") //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件
var tsc = require("gulp-typescript"); // 编译tsc文件
var jsdoc = require("gulp-jsdoc3");  //生成jsdoc文档
var jsdocConfig = require("./jsdocconfig.json");

var paths = {
    sass:{src:"public/stylesheets/src/*.scss",dest:"public/stylesheets/css"},
    cssMin:{src:"public/stylesheets/css/*.css",dest:"public/stylesheets/dest"},
    ug:{src:["public/javascripts/js/*.js","public/javascripts/js/*/*.js"],dest:"public/javascripts/dest"},
    tsServer:{src:"src/*/*.ts",dest:"build"},
    jsdoc:{src:["build/**/*.js"],dest:"doc/"},
}
let tsServerConfig = tsc.createProject("src/tsconfig.json");

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
 * 生成api文档
 */
gulp.task("jsdoc",()=>{
    return gulp.src(paths.jsdoc.src)
        .pipe(jsdoc(jsdocConfig));
})

/**
 * 编译node.js的ts文件
 */
gulp.task("tscServer",()=>{
    var tsResult = gulp.src(paths.tsServer.src)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsServerConfig))
        .pipe(sourcemaps.write(".",{sourceRoot: '../src'}))
        .pipe(gulp.dest(paths.tsServer.dest));
})

gulp.task("tscServer:w",['tscServer'],function(){
    gulp.watch(paths.tsServer.src,['tscServer']);
})

//监视
gulp.task("watch",function(){
    gulp.watch(paths.sass.src,["sass"]);
    gulp.watch(paths.cssMin.src,["cssMin"]);
    gulp.watch(paths.jsdoc.src,["jsdoc"]);
    gulp.watch(paths.tsServer.src,["tscServer"]);
    //gulp.watch(paths.ug.src,["ug"]);
    
})

gulp.task("default",["watch"]);

