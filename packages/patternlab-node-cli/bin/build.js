'use strict';
const pl = require('patternlab-node');
const debug = require('./utils').debug;
const isValidConfig = require('./validate-config');

/**
 * @func build
 * @desc Init patternLab core and build the PatternLab files.
 * @param {object} config - The passed PatternLab config.
 * @param {object} options - Additional opts to specify build mode.
 */
function build(config, options) {
	if (!isValidConfig) throw new TypeError('build→Expects config not to be empty and of type object.');
	
	// Initiate PatternLab core with the config
	const patternLab = pl(config);
	
	/**
	 * Check whether a flag was passed for build
	 * 1. Build only patterns
	 * 2. Normal build
	 */
	if (options && options.patternsOnly) { // 1
		debug(`patternlab→build: Building only patterns now into ${config.paths.public.root}`);
		return patternLab.patternsonly(function () {
			console.log(`patternlab→build: Yay, your patterns were successfully built ☺`); // eslint-disable-line
		}, config.cleanPublic);
	} else { // 2
		debug(`patternlab→build: Building your project now into ${config.paths.public.root}`);
		return patternLab.build(function () {
			console.log(`patternlab→build: Yay, your PatternLab project was successfully built ☺`); // eslint-disable-line
		}, config.cleanPublic);
	}
}

module.exports = build;
