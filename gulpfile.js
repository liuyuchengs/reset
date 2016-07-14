
var gulp = require("gulp");
var sass = require("gulp-sass"); //编译sass->css
var cssMin = require("gulp-cssmin") //压缩css
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps"); //压缩时建立map文件
var ts = require("gulp-typescript"); //编译typescript文件

var paths = {
    sass:{src:"public/stylesheets/src/*.scss",dest:"public/stylesheets/css"},
    cssMin:{src:"public/stylesheets/css/*.css",dest:"public/stylesheets/dest"},
    ptsc:{src:"public/javascripts/ts/*.ts",dest:"public/javascripts/js"},
    ptscModule:{src:"public/javascripts/ts/modules/*.ts",dest:"public/javascripts/js/modules"},
    ptscControll:{src:"public/javascripts/ts/controller/*.ts",dest:"public/javascripts/js/controller"},
    pug:{src:"public/javascripts/js/*.js",dest:"public/javascripts/dest"},
    pugControll:{src:"public/javascripts/js/controller/*.js",dest:"public/javascripts/dest/controller"},
    pugModule:{src:"public/javascripts/js/modules/*.js",dest:"public/javascripts/dest/modules"},
    tscRoute:{src:"routes/ts/*.ts",dest:"routes/js"},
    tscModule:{src:"modules/ts/*.ts",dest:"modules/js"},
    tscControll:{src:"controller/ts/*.ts",dest:"controller/js"}
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
 * 编译app.ts,main.ts
 */
gulp.task("ptsc",function(){
    var tsResult = gulp.src(paths.ptsc.src)
        .pipe(ts({
            module: "amd",
            target: "es5",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.ptsc.dest));
})

/**
 * 编译module下的ts
 */
gulp.task("ptscModule",function(){
    var tsResult = gulp.src(paths.ptscModule.src)
        .pipe(ts({
            module: "amd",
            target: "es5",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.ptscModule.dest));
})

/**
 * 编译controller下的ts
 */
gulp.task("ptscControll",function(){
    var tsResult = gulp.src(paths.ptscControll.src)
        .pipe(ts({
            module: "amd",
            target: "es5",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.ptscControll.dest));
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

/**
 * 编译node.js的router
 */
gulp.task("tscRoute",function(){
    var tsResult = gulp.src(paths.tscRoute.src)
        .pipe(ts({
            module: "commonjs",
            target: "es6",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.tscRoute.dest));
})

/**
 * 编译node.js的module
 */
gulp.task("tscModule",function(){
    var tsResult = gulp.src(paths.tscModule.src)
        .pipe(ts({
            module: "commonjs",
            target: "es6",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.tscModule.dest));
})

/**
 * 编译node.js的controller
 */
gulp.task("tscControll",function(){
    var tsResult = gulp.src(paths.tscControll.src)
        .pipe(ts({
            module: "commonjs",
            target: "es6",
            declaration:false,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest(paths.tscControll.dest));
})

//监视
gulp.task("watch",function(){
    gulp.watch(paths.sass.src,["psass"]);
    gulp.watch(paths.cssMin.src,["pcssMin"]);
    gulp.watch(paths.ptsc.src,["ptsc"]);
    gulp.watch(paths.ptscModule.src,["ptscModule"]);
    gulp.watch(paths.ptscControll.src,["ptscControll"]);
    gulp.watch(paths.pug.src,["pug"]);
    gulp.watch(paths.pugModule.src,["pugModule"]);
    gulp.watch(paths.pugControll.src,["pugControll"]);
    gulp.watch(paths.tscRoute.src,["tscRoute"]);
    gulp.watch(paths.tscModule.src,["tscModule"]);
    gulp.watch(paths.tscControll.src,["tscControll"]);
})

gulp.task("default",["watch"]);

