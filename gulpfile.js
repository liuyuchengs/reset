
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cssMin = require("gulp-cssmin") //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件
var tsc = require("gulp-typescript"); // 编译tsc文件
var jsdoc = require("gulp-jsdoc3");  //生成jsdoc文档
var jsdocConfig = require("./jsdocconfig.json");

// 编译环境
var env = "dev";// dev,test,online
// 路径变量
var paths = {
    sass:{src:"public/stylesheets/src/*.scss",devDest:"public/stylesheets/dest",testDest:"public/stylesheets/css",proDest:"public/stylesheets/css"},
    cssMin:{src:"public/stylesheets/css/*.css",dest:"public/stylesheets/dest"},
    ug:{src:["public/javascripts/js/*.js","public/javascripts/js/*/*.js"],dest:"public/javascripts/dest"},
    jsdoc:{src:["build/**/*.js"],dest:"doc/"},
}

//根据不同的环境生成不同的编译方案
function initGulp(status){
    // 生成api文档
    gulp.task("jsdoc",()=>{
        return gulp.src(paths.jsdoc.src)
            .pipe(jsdoc(jsdocConfig));
    })
    if(status==="dev"){
        // 编译前端sass
        gulp.task("sass",function(){
            return gulp.src(paths.sass.src)
                .pipe(sass())
                .pipe(gulp.dest(paths.sass.devDest));
        })
        //监视
        gulp.task("watch",function(){
            gulp.watch(paths.sass.src,["sass"]);
            gulp.watch(paths.jsdoc.src,["jsdoc"]);
        })
    }else if(status==="test"){
        // 编译前端sass
        gulp.task("sass",function(){
            return gulp.src(paths.sass.src)
                .pipe(sass())
                .pipe(gulp.dest(paths.sass.testDest));
        })
        // 压缩前端css
        gulp.task("cssMin",function(){
            return gulp.src(paths.cssMin.src)
                .pipe(cssMin())
                .pipe(gulp.dest(paths.cssMin.dest));
        })
        // 压缩前端js文件并生成map文件
        gulp.task("ug",()=>{
            return gulp.src(paths.ug.src)
                .pipe(uglify())
                .pipe(gulp.dest(paths.ug.dest))
        })
        // 监听
        gulp.task("watch",()=>{
            gulp.watch(paths.sass.src,["sass"]);
            gulp.watch(paths.cssMin.src,["cssMin"]);
            gulp.watch(paths.ug.src,["ug"]);
            gulp.watch(paths.jsdoc.src,["jsdoc"]);
        })
    }
}

initGulp(env);

gulp.task("default",["watch"]);

