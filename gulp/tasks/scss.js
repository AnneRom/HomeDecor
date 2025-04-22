import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoprefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
        .pipe(
			app.plugins.if(
				app.isWebP,
				app.plugins.if(
					app.isBuild,
					webpcss(
						{
							webpClass: ".webp",
							noWebpClass: ".no-webp"
						}
					)
				)
			)
		)
        .pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: false,
					overrideBrowserslist: ["last 1 versions"],
					cascade: true
				})
			)
		)
        .pipe(app.gulp.dest(app.path.build.css)) // Зберігаємо style.css (незмінений)
        .pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)// Мінімізуємо
        .pipe(rename({ extname: ".min.css" })) // Перейменовуємо
        .pipe(app.gulp.dest(app.path.build.css)) // Зберігаємо style.min.css
        .pipe(app.plugins.browsersync.stream());
};
