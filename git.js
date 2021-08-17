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
var logger = require( 'debug' );


// VARIABLES //

var debug = logger( 'remark-img-equations-src-urls:git' );

// Regular expression to extract a repository slug:
var RE = /(?:.+github\.com)(?:\/|:)(.+)\.(?:.+)/;


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
	debug( 'Local repository directory: %s', dir );

	opts = {
		'cwd': dir
	};

	// Get the remote origin:
	cmd = 'git config --get remote.origin.url';
	out = exec( cmd, opts );
	origin = out.toString();
	debug( 'Remote origin: %s', origin );

	// Extract the repository slug:
	rslug = origin.match( RE )[ 1 ];
	debug( 'Repository slug: %s', rslug );

	// Get the current Git hash and remove any newline characters:
	cmd = 'git rev-parse HEAD';
	out = exec( cmd, opts );
	hash = out.toString().match( /(.+)/ )[ 1 ];
	debug( 'Current hash: %s', hash );

	hslug = rslug+'/'+hash;
	debug( 'Hash slug: %s', hslug );

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
