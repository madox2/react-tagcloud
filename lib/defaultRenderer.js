'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRenderer = exports.defaultRenderer = function defaultRenderer(tag, size, color) {
  var fontSize = size + 'px';
  var key = tag.key || tag.value;
  var style = (0, _objectAssign2.default)({}, styles, { color: color, fontSize: fontSize });
  return _react2.default.createElement(
    'span',
    { className: 'tag-cloud-tag', style: style, key: key },
    tag.value
  );
};

var styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};