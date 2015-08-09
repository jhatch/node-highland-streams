var config   = require('config');
var highland = require('highland');

module.exports = {
  init: init
};

function init() {
  highland(process.stdin)

    .map(x => x.toString())

    // when the user presses CTRL+C
    .filter(x => x === config.const.CTRL_C)

    // exit the program
    .each(() => process.exit(0));
}