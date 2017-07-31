const gulp = require('gulp');
const del = require('del');
const imageMin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const runSequence = require('run-sequence');

gulp.task('clean:src', () => del(['src/**/*']));

gulp.task('clean:dist', () => del(['dist/**/*']));

gulp.task('compress', () => {
    return gulp.src('./src/*')
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

gulp.task('default', () => {
    runSequence('clean:dist', 'compress', 'clean:src', () => console.log('Finished Image Compression Tasks 🔥'));
});