"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates new object from target excluding given properties.
 */
var omitProps = exports.omitProps = function omitProps(target, props) {
  return Object.keys(target).reduce(function (r, key) {
    if (!~props.indexOf(key)) {
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
  if (max - min === 0) {
    // handle devision by zero
    return Math.round((minSize + maxSize) / 2);
  }
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};

/**
 * Returns true if arrays contains the same elements.
 */
var arraysEqual = exports.arraysEqual = function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every(function (o, i) {
    return o === arr2[i];
  });
};

var propertiesEqual = exports.propertiesEqual = function propertiesEqual(o1, o2, properties) {
  return properties.every(function (prop) {
    return o1[prop] === o2[prop];
  });
};