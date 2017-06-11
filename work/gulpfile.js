const gulp=require("gulp"),
	  uglify=require("gulp-uglify"),
	  url=require("url"),
	  minify=require("gulp-minify-css"),
	  path=require("path"),
	  htmlmin=require("gulp-htmlmin"),
	  concat=require("gulp-concat"),
	  sass=require("gulp-sass"),
	  rev=require('gulp-rev'),
	  collector=require('gulp-rev-collector'),
	  webserver=require("gulp-webserver"),
	  imagemin=require('gulp-imagemin'),
	  browserify = require('gulp-browserify');//模块化的打包

var data = require("./new/data/data.js");
// console.log(data);


// // 压缩js文件，成一行
// gulp.task("jsmini",()=>{
// 	gulp.src("./new/js/*.js")
// 		.pipe(uglify())
// 		.pipe(gulp.dest("./build/js/"));
// });

// // 压缩css文件，成一行
// gulp.task("cssmini",()=>{
// 	gulp.src("./new/css/*.css")
// 		.pipe(minify())
// 		.pipe(gulp.dest("./build/css/"));
// });


// // 压缩html文件，成一行
// gulp.task('htmlmini',()=>{
// 	gulp.src('./new/html/*.html')
//     	.pipe(htmlmin({collapseWhitespace: true}))
//     	.pipe(gulp.dest('./build/html/'));
// });

// //合并js文件到新的目录下
// gulp.task('scripts',()=>{
// 	gulp.src('src/js/*.js')
//     	.pipe(concat('all.js'))
//     	.pipe(gulp.dest('./dist/'))
// });


// // 编译sass文件
// gulp.task('sass', function () {
//   	gulp.src('./new/**/*.scss')
//     	.pipe(sass().on('error', sass.logError))
//     	.pipe(gulp.dest('./build/'));
// });


// //打包模块
// gulp.task("jsmin",function(){
// 	gulp.src("./new/js/*.js")
// 		.pipe(browserify({
//           insertGlobals : true,
//           debug : !gulp.env.production
//         }))
// 		.pipe(gulp.dest("./build/js/"))
// })

// //压缩图片
// gulp.task('image', () =>
//     gulp.src('src/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'))
// );

//web服务热启动	(生成mock数据)
gulp.task('server',function(){
	gulp.src('./')
		.pipe(webserver({
			port:5000,
			livereload:true,
			directoryListing: true,
		    middleware:function(req,res,next){
		      	var pathname = (url.parse(req.url).pathname);
		      	data.forEach(function(i){
		      		switch(i.route){
		      			case pathname:{
		      				i.handle(req,res,next.url)
		      			}
		      		}
		      	})
		      },
			open:'./new/html/index.html'
		}))
});

//将css文件的版本号生成json，放到json文件夹中（版本控制）
gulp.task('ver',function(){
	gulp.src('./new/css/index.css')
		.pipe(rev())
		.pipe(gulp.dest('./new/css_last'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./new/json'))
});

//让浏览器引用json中所生成的版本地址
gulp.task('coll',['ver'],function(){
	gulp.src(['./new/json/*.json','./new/html/index.html'])
		.pipe(collector({replaceReved:true}))
		.pipe(gulp.dest('./new/html/'))
});




