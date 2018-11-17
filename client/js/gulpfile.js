var gulp=require('gulp');
var sass=require('gulp-sass');
gulp.task('indexsass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./src/css/'))
})
// 监听sass文件修改
gulp.task('jtSass',function(){
	// 监听home.scss文件，如果有修改,则自动自动compileSass任务
	gulp.watch('./src/sass/*.scss',['indexsass']);
});

browserSync=require('browser-sync');
// 安装依赖
// 设置任务---架设静态服务器
gulp.task('epetbrowser', function () {
browserSync.init({
    files:['./src/css/*.css','./src/**/*.html','./src/api/*.php','./src/js/*.js'],
    // files:['**'],
    proxy:'http://localhost:777',
    // server:{
        // baseDir:'./src',  // 设置服务器的根目录
        // index:'index.html' // 指定默认打开的文件
    // },
    port:777  // 指定访问服务器的端口号
});
gulp.watch('./src/sass/*.scss',['indexsass']);
});
