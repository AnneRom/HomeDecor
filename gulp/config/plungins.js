import replace from "gulp-replace";
import browsersync from "browser-sync";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import newer from "gulp-newer";

export const plugins = {
    replace: replace,
    notify: notify,
    browsersync: browsersync,
    plumber: plumber,
    newer: newer
}