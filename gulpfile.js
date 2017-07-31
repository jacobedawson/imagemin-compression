const gulp = require('gulp');
const del = require('del');
const imageMin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// clear the src folder
gulp.task('clean:src', () => {
    return del([
        'src/**/*'
    ]);
});

gulp.task('clean:dist', () => {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('clean:all', ['clean:src', 'clean:dist']);

gulp.task('compress', () => {
    gulp.src('./src/*')
        .pipe(imageMin([
            imageMin.gifsicle({
                interlaced: true
            }),
            pngquant({
                quality: '65-80'
            }),
            imageMin.jpegtran({
                progressive: true
            }),
            imageMin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ]))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['compress', 'clean:src'], () => {
    console.log('Finished Image Compression Tasks 🔥');
});