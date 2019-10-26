"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultRenderer = function defaultRenderer(tag, size, color) {
  var fontSize = size + 'px';
  var key = tag.key || tag.value;

  var style = _objectSpread({}, styles, {
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