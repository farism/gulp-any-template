# gulp-any-template [![Circle CI](https://circleci.com/gh/farism/gulp-any-template/tree/master.svg?style=svg)](https://circleci.com/gh/farism/gulp-any-template/tree/master)

Zero-config Gulp plugin to pipe any template format and emit an interpolated file. Currently supported templating engines are:

- Dustjs-linkedin
- EJS
- Handlebars
- Hogan
- lodash.template
- Mustache
- Pug
- Swig
- underscore.template

#### Example

```js
const anyTemplate = require('gulp-any-template')

gulp.task('compile-template', () => {
  return gulp.src('index.ejs')
    .pipe(anyTemplate({ title: 'Title' }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('build'))
})
```
