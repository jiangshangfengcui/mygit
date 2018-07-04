'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};



/*****************
 ** WEBPACK FOOTER
 ** ./lib/helpers/bind.js
 ** module id = 17
 ** module chunks = 0
 **/