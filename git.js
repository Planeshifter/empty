/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var exec = require( 'child_process' ).execSync;


// VARIABLES //

// Regular expression to extract a repository slug:
var RE = /(?:.+github\.com)(?:\/|:)(.+)(?:\.(?:.+)|\s*$)/;


// MAIN //

/**
* Returns git repository info.
*
* @private
* @returns {Object} repository info
*/
function git() {
	var origin;
	var hslug;
	var rslug;
	var opts;
	var hash;
	var dir;
	var cmd;
	var out;

	// Get the local git repository path and remove any newline characters:
	dir = exec( 'git rev-parse --show-toplevel' );
	dir = dir.toString().match( /(.+)/ )[ 1 ];

	opts = {
		'cwd': dir
	};

	// Get the remote origin:
	cmd = 'git config --get remote.origin.url';
	out = exec( cmd, opts );
	origin = out.toString();

	// Extract the repository slug:
	console.log( 'Origin: '+origin );
	console.log( 'Origin without using CWD: '+exec( cmd ).toString() );
	rslug = origin.match( RE )[ 1 ];

	// Get the current Git hash and remove any newline characters:
	cmd = 'git rev-parse HEAD';
	out = exec( cmd, opts );
	hash = out.toString().match( /(.+)/ )[ 1 ];

	hslug = rslug+'/'+hash;

	out = {
		'dir': dir,
		'slug': rslug,
		'hash': hash,
		'origin': origin,
		'hslug': hslug
	};
	return out;
}


// EXPORTS //

console.log( JSON.stringify( git(), null, '\t' ) );
