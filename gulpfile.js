var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browsersync = require('browser-sync');

gulp.task('browser',['nodemon'],function() {//事前のnodemonによるサーバー再起動を完了させる
    browsersync.init(null,{
        proxy: 'http://localhost:8000',//ポート番号はbin/wwwに記載のポートに合わせる
        port: '4000',           //ここで指定したポート番号でbrowser-syncを起動
        ws: true,
        files: [                //監視対象ファイル
            'views/**/*.*',
            'public/stylesheets/**/*.scss',

            'public/javascripts/*.js',
            'public/images/*.*'
        ],
    });
});

gulp.task('nodemon',function(cd) {
    var start = false;
    return nodemon({
        script: 'bin/www',//実行スクリプトの指定　ここで注意する点が...
        ext : 'js css html ejs',
        env: {
            NODE_ENV: 'development'
        }
    }).on('start',function() {
        if(!start) {
            cd();
            start = true;
        }
    });
});

gulp.task('default',['browser']);//最後にdefaultタスクにてbrowser-sync、nodemon実行
