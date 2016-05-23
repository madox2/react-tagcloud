"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates new object from target excluding given properties.
 */
var omitProps = exports.omitProps = function omitProps(target, props) {
  return Object.keys(target).reduce(function (r, key) {
    if (! ~props.indexOf(key)) {
      r[key] = target[key];
    }
    return r;
  }, {});
};

/**
 * Creates new object from target including all available properties.
 */
var includeProps = exports.includeProps = function includeProps(target, props) {
  return Object.keys(target).reduce(function (r, key) {
    if (~props.indexOf(key) && key in target) {
      r[key] = target[key];
    }
    return r;
  }, {});
};

/**
 * Computes appropriate font size of tag.
 */
var fontSizeConverter = exports.fontSizeConverter = function fontSizeConverter(count, min, max, minSize, maxSize) {
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};