"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultRenderer = function defaultRenderer(tag, size, color) {
  var fontSize = size + 'px';
  var key = tag.key || tag.value;
  var style = (0, _objectAssign["default"])({}, styles, {
    color: color,
    fontSize: fontSize
  });
  return _react["default"].createElement("span", {
    className: "tag-cloud-tag",
    style: style,
    key: key
  }, tag.value);
};

exports.defaultRenderer = defaultRenderer;
var styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};