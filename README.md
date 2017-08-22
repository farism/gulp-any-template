# gulp-any-template [![Circle CI](https://circleci.com/gh/farism/gulp-any-template/tree/master.svg?style=svg)](https://circleci.com/gh/farism/gulp-any-template/tree/master)

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
