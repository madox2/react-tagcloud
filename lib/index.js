'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = exports.DefaultRenderer = exports.TagCloud = undefined;

var _TagCloud = require('./TagCloud');

Object.defineProperty(exports, 'TagCloud', {
  enumerable: true,
  get: function get() {
    return _TagCloud.TagCloud;
  }
});

var _defaultRenderer = require('./defaultRenderer');

var deprecatedRendererExport = function deprecatedRendererExport() {
  // eslint-disable-next-line no-console
  console.warn('Using deprecated \'DefaultRenderer\' import, it will be removed in the next major release and replaced with \'defaultRenderer\'.');
  return _defaultRenderer.defaultRenderer.apply(undefined, arguments);
};

exports.DefaultRenderer = deprecatedRendererExport;
exports.defaultRenderer = _defaultRenderer.defaultRenderer;