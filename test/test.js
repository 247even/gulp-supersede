var assert   = require('assert');
var gutil    = require('gulp-util');
var smoosher = require('../index');
var fs       = require('fs');
var path     = require('path');

describe('gulp-supersede', function() {
	describe('in buffer mode', function() {

		it('should replace content in DOM with provided file', function(done) {

			var filename = path.join(__dirname, '/fixtures/input.html');

			var input = new gutil.File({
				base: path.dirname(filename),
				path: filename,
				contents: new Buffer(fs.readFileSync(filename, 'utf8'))
			});

			var stream = supersede();

			stream.on('data', function(newFile) {
				assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, '/fixtures/output.html'), 'utf8'));
				done();
			})

			stream.write(input);

		});

	});
});