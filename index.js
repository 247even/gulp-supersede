'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');

module.exports = function() {


	// create a stream through which each file will pass
	return through.obj(function(file, enc, callback) {

		if (file.isNull()) {
			this.push(file);
			// do nothing if no contents
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-supersede', 'Streaming not supported'));
			return callback();
		}

		if (file.isBuffer()) {

			var $ = cheerio.load(String(file.contents));
			$('[supersede]').each(function(){
				var spath = this.attr('supersede');
				var sfile = fs.readFileSync(path.join(file.base, spath), 'utf8');
				this.replaceWith('<!-- supersede: '+spath+' -->'+ sfile +' <!-- end supersede: '+spath+' -->');
			});
			var output = $.html();

			file.contents = new Buffer(output);

			return callback(null, file);
		}
	});
}; 