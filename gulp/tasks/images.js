import webp from "gulp-webp";

export const images = async () => {
   const imagemin = (await import("gulp-imagemin")).default;
   const imageminMozjpeg = (await import("imagemin-mozjpeg")).default;
   const imageminPngquant = (await import("imagemin-pngquant")).default;
   const imageminSvgo = (await import("imagemin-svgo")).default;
    return app.gulp.src(app.path.src.images, { sourcemaps: true })
       .pipe(app.plugins.plumber(
          app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
          })
       ))
        // Оновлення тільки змінених файлів
        .pipe(app.plugins.newer(app.path.build.images))

        // Генеруємо WEBP тільки для JPG/PNG
        .pipe(
			app.plugins.if(
				app.isWebP,
				webp()
			)
		)
		.pipe(
			app.plugins.if(
				app.isWebP,
				app.gulp.dest(app.path.build.images)
			)
		)

        // Мінімізуємо JPG/PNG
        .pipe(app.gulp.src(app.path.src.images))
        .pipe(app.plugins.newer(app.path.build.images))
        .on('end', async () => {
    try {
        await imagemin([`${app.path.build.images}/*.{jpg,jpeg,png,svg}`], {
            destination: app.path.build.images,
            plugins: [
                imageminMozjpeg({ quality: 75 }),
                imageminPngquant({ quality: [0.6, 0.8] }),
                imageminSvgo({ plugins: [{ removeViewBox: false }] })
            ]
        });
    } catch (error) {
        console.error("Imagemin error:", error);
    }
})
        // Копіюємо SVG без змін окремо
        .pipe(app.gulp.src(`${app.path.srcFolder}/img/**/*.svg`)) 
        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.plugins.browsersync.stream());
};
