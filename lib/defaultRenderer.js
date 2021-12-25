"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _excluded = ["className", "style"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultRenderer = function defaultRenderer(tag, size, color) {
  var _ref = tag.props || {},
      className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, _excluded);

  var fontSize = size + 'px';
  var key = tag.key || tag.value;

  var tagStyle = _objectSpread(_objectSpread({}, styles), {}, {
    color: color,
    fontSize: fontSize
  }, style);

  var tagClassName = 'tag-cloud-tag';

  if (className) {
    tagClassName += ' ' + className;
  }

  return /*#__PURE__*/_react["default"].createElement("span", _extends({
    className: tagClassName,
    style: tagStyle,
    key: key
  }, props), tag.value);
};

exports.defaultRenderer = defaultRenderer;
var styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};