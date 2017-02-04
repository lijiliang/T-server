/*
    *@description: gulp  任务
*/
const path  = require('path');
const gulp  = require('gulp');
const watch = require('gulp-watch');
//const fs    = require('fs');

const webpack = require('gulp-webpack');
const fileinclude = require('gulp-file-include');
const named = require('vinyl-named');
const rename = require('gulp-rename');

/*设置相关*/
const config = require('./config');
const srcDir = config.path.src;
const debugDir = config.path.debug;
const distDir = config.path.dist;
const htmlViews = config.htmlViews;
const appJsPath = config.appJsPath;

/*webpack 配置相关*/
const configPro = require('./webpack.config');
const configDebugCtrl = require('./webpack.dev');
const configCore = require('./webpack.core');
//const configAntd = require('./webpack.antd');


/*源码相关-针对gulp 监听或者编译  凡是以_开头的文件或者以_开头的文件夹下的文件都不执行编译*/
const _htmlSrcPath = srcDir+'/html/';
const _htmlFile = [
    _htmlSrcPath+'*.html',
    _htmlSrcPath+'**/*.html',
    `!${_htmlSrcPath}/**/_*/*.html`,
    `!${_htmlSrcPath}/**/_*/**/*.html`,
    `!${_htmlSrcPath}/**/_*.html`
];//html

const _jsSrcPath = srcDir+'/js/';
const _jsFile = [
    `${_jsSrcPath}/${appJsPath}/**/*.js?(x)`,
    `!${_jsSrcPath}**/_*/*.js?(x)`,
    `!${_jsSrcPath}**/_*/**/*.js?(x)`,
    `!${_jsSrcPath}**/_*.js?(x)`
];//js jsx

const _jsCoreFile = [`${_jsSrcPath}vender/*.js?(x)`,`!${_jsSrcPath}/vender/antd.js`];
//const _jsAntdFile = [`${_jsSrcPath}vender/antd.js`];
const _jsThirdParty = [`${_jsSrcPath}third-party/**/*`]; //第三方 框架 独立组件 比如富文本编辑器

/*监听html*/
gulp.task('html:dev',() => {
    //{events:['add', 'change']} 监听 新增、修改
    watch(_htmlFile,{events:['add', 'change']},(file) => {
        console.log(file.path+' complite!');
    })
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews));
});

/*编译html*/
gulp.task('html:build',() => {
    gulp.src(_htmlFile)
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest(htmlViews))
    .on('end',() => {
        console.log('html is finished!');
    });
});

/*第三方组件 框架*/
gulp.task('jsThird:build',() => {
    gulp.src(_jsThirdParty)
    .pipe(gulp.dest(distDir+'/js/'))
    .on('end',() => {
        console.log('js third-party is complite!');
    });
});

gulp.task('jsThird:dev',() => {
    gulp.src(_jsThirdParty)
    .pipe(watch(_jsThirdParty,{events:['add', 'change']},(file) => {
        const _dir = path.dirname(file.relative).replace(/\\/g,'/').replace(/\./g,'');
        //console.log(path.dirname(file.relative))
        //console.log(debugDir+'/js/'+_dir,file.path)
        gulp.src(file.path)
            .pipe(gulp.dest(debugDir+'/js/'+_dir))
            .on('end',() => {
                //console.log(file.path+' is complite!');
            });
    }));
});

const antdNodeFilePath = path.join(__dirname,'node_modules','antd','dist');
// antd  构建
gulp.task('antd:dev',() => {
    const startTime = (new Date()).getTime();

    gulp.src([antdNodeFilePath+'/antd.js',antdNodeFilePath+'/antd.css'])
    .pipe(rename(function(_path){
        _path.dirname = `/${_path.extname.replace('.','')}/`;
        _path.basename = _path.basename.replace('.min','');
    }))
    .pipe(gulp.dest(debugDir))
    .on('end',function(){
        const endTime = (new Date()).getTime();
        console.log('antd build is finished!');
        console.log(`use time:${(endTime-startTime)/1000} s`);
    });
});

/* antd 编译 */
gulp.task('antd:build',() => {
    const startTime = (new Date()).getTime();

    gulp.src([antdNodeFilePath+'/antd.min.js',antdNodeFilePath+'/antd.min.css'])
    .pipe(rename(function(_path){
        _path.dirname = `/${_path.extname.replace('.','')}/`;
        _path.basename = _path.basename.replace('.min','');
    }))
    .pipe(gulp.dest(distDir))
    .on('end',function(){
        const endTime = (new Date()).getTime();
        console.log('antd build is finished!');
        console.log(`use time:${(endTime-startTime)/1000} s`);
    });
});

const jsWatchList = new Set();
/*开发模式下构建和监听js*/
gulp.task('js:dev',['jsThird:dev'],() => {
    gulp.src(_jsFile)
    .pipe(watch(_jsFile,{events:['add', 'change']},(file) => {
        if(jsWatchList.has(file.path)){
            return false;
        }else{
            jsWatchList.add(file.path);
            gulp.src(file.path)
                .pipe(webpack(configDebugCtrl(file.relative)))
                .pipe(gulp.dest(debugDir+'/'))
                .on('end',() => {
                    console.log(file.relative+' is complite!');
                });
            return true;
        }
    }));
});


/*dev环境编译执行*/
gulp.task('dev',['html:build','html:dev','js:dev']);

/* 编译核心文件 dev模式下 */
gulp.task('core:dev',() => {
    const startTime = (new Date()).getTime();

    gulp.src(_jsCoreFile)
        .pipe(named(function(file){
            let _file = file.relative.replace(/\\/g,'/');
            _file = _file.replace(/\//g,'_');
            file.named  = path.basename(_file, path.extname(_file));
            this.queue(file);
        }))
        .pipe(webpack(configCore()))
        .pipe(gulp.dest(debugDir+'/'))
        .on('end',function(){
            const endTime = (new Date()).getTime();
            console.log('corejs is finished!');
            console.log(`use time:${(endTime-startTime)/1000} s`);
        });
});

/* 编译核心文件 */
gulp.task('core:build',() => {
    const startTime = (new Date()).getTime();

    gulp.src(_jsCoreFile)
        .pipe(named(function(file){
            let _file = file.relative.replace(/\\/g,'/');

            _file = _file.replace(/\//g,'_');
            file.named  = path.basename(_file, path.extname(_file));
            this.queue(file);
        }))
        .pipe(webpack(configCore('www')))
        .pipe(gulp.dest(distDir+'/'))
        .on('end',function(){
            const endTime = (new Date()).getTime();
            console.log('corejs is finished!');
            console.log(`use time:${(endTime-startTime)/1000} s`);
        });
});

/*生产环境编译执行*/
gulp.task('build', ['html:build','jsThird:build'],() => {
    const startTime = (new Date()).getTime();
    gulp.src(_jsFile)
        .pipe(named(function(file){
            let _file = file.relative.replace(/\\/g,'/');
            _file = _file.replace(/\//g,'_');
            file.named  = path.basename(_file, path.extname(_file));

            this.queue(file);
        }))
        .pipe(webpack(configPro))
        .pipe(gulp.dest(distDir+'/'))
        .on('end',function(){
            const endTime = (new Date()).getTime();
            console.log('js is finished!');
            console.log(`use time:${(endTime-startTime)/1000} s`);
        });
});
