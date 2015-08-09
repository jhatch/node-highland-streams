//
// # use node to search Wikipedia from the command line!
//
//     ## also learn about RxJS...
//
var config     = require('config');
var request    = require('request-promise');
var highland   = require('highland');
var killStream = require('./lib/killStream');

process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true); // go char by char instead of line by line

//
// # listen to stdin:
//
//    1. to keep a buffer of all chars entered
//    2. to debounce and wait for the right time to fire a search
//
// ## TODO:
//    - refactor to use 1 stream with multiple observables instead of using multiple streams
//    - make a buffer class
//
var buffer = [];
var bufferStream   = highland(process.stdin);
var debounceStream = highland(process.stdin);

// 1.
bufferStream.each(c => buffer.push(c) && process.stdout.write(c));

// 2.
debounceStream.debounce(1000).each(runSearch);

// 3.
killStream.init();

// outter wrapper for searching wikipedia
function runSearch() {
  highland(searchWikipedia( buffer.join('') )).collect().each(res => console.log('Wikipedia:', res));
  buffer = [];
  process.stdout.write('\n');
}

// run a search against all wikipedia articles
// @return: Promises/A+
function searchWikipedia(term) {
  return request({
    url: config.services.wikipedia.baseUrl,
    json: true,
    qs: {
      action: 'opensearch',
      format: 'json',
      search: term
    }
  }).then(data => data[2][0]);
}