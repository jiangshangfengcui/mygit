'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};



/*****************
 ** WEBPACK FOOTER
 ** ./lib/helpers/normalizeHeaderName.js
 ** module id = 4
 ** module chunks = 0
 **/