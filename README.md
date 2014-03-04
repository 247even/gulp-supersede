# gulp-supersede [![Build Status](https://travis-ci.org/247even/gulp-supersede.png?branch=master)](https://travis-ci.org/247even/gulp-supersede)


## Example

#### `index.html`

```html
<html>
	<head>
	</head>
	<body>
		<div supersede="helloworld.txt"> </div>
...
```

#### `helloworld.txt`
```html
Hello World!
```

#### `gulpfile.js`

```js
var gulp = require('gulp');
var supersede = require('gulp-supersede');

gulp.task('default', function () {
	gulp.src('index.html')
		.pipe(supersede())
		.pipe(gulp.dest('path'));
});
```

#### `path/index.html`

```html
<html>
	<head>
	</head>
	<body>
	<!-- supersede: helloworld.txt -->
	Hello World!
	<!-- end supersede -->
...
```



### License

MIT © 247even
