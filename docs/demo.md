# This is a h1
## This is a h2
### This is a h3
#### This is a h4
##### This is a h5

---

*italic*

**bold**

---

`$ echo code`

```
// code
gulp.task('build:md', function () {
  return gulp.src(pathMD)
    .pipe(markdown())
    .pipe(headerfooter.header('./partials/header.html'))
    .pipe(headerfooter.footer('./partials/footer.html'))
    .pipe(gulp.dest('./build'));
});
```

---

> quote