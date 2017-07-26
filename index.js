const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
 
imagemin(['./src/*.png'], './dist', {
    plugins: [
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log('All Done🔥');
});