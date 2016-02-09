var gulp  = require('gulp')
var shell = require('gulp-shell')

gulp.task('development', shell.task([
  'NODE_ENV=development nodejs server/app.js'
]))

gulp.task('production', shell.task([
  'NODE_ENV=production nodejs server/app.js'
]))