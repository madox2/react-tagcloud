"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = pick;
exports.values = values;
exports.keys = keys;
/**
 * Computes appropriate font size of tag.
 */
var fontSizeConverter = exports.fontSizeConverter = function fontSizeConverter(count, min, max, minSize, maxSize) {
  if (max - min === 0) {
    // handle devision by zero
    return Math.round((minSize + maxSize) / 2);
  }
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};

/**
 * Creates an object composed of not omitted object properties.
 */
var omit = exports.omit = function omit(obj, keys) {
  return Object.keys(obj).reduce(function (r, key) {
    if (!~keys.indexOf(key)) {
      r[key] = obj[key];
    }
    return r;
  }, {});
};

/**
 * Creates an object composed of the picked object properties.
 */
function pick(obj, keys) {
  return keys.reduce(function (picked, key) {
    picked[key] = obj[key];
    return picked;
  }, {});
}

/**
 * Returns an array of object values.
 */
function values(obj) {
  return Object.values(obj);
}

/**
 * Returns an array of object keys.
 */
function keys(obj) {
  return Object.keys(obj);
}