"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloud = TagCloud;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _shuffleArray = _interopRequireDefault(require("shuffle-array"));

var _randomcolor = _interopRequireDefault(require("randomcolor"));

var _seedrandom = _interopRequireDefault(require("seedrandom"));

var _defaultRenderer = require("./defaultRenderer");

var _helpers = require("./helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handlersPropNames = ['onClick', 'onDoubleClick', 'onMouseMove', 'onMouseOver', 'onMouseOut', // rn handlers
'onPress', 'onPressIn', 'onPressOut'];
var cloudPropNames = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'colorOptions', 'disableRandomColor', 'randomSeed', 'randomNumberGenerator', 'containerComponent'];

function getTagHashCode(tag) {
  return tag.key + tag.value + tag.count;
}

function generateColor(tag, _ref) {
  var disableRandomColor = _ref.disableRandomColor,
      colorOptions = _ref.colorOptions,
      randomSeed = _ref.randomSeed;

  if (tag.color) {
    return tag.color;
  }

  if (disableRandomColor) {
    return undefined;
  }

  return (0, _randomcolor["default"])(_objectSpread({
    seed: randomSeed && "".concat(randomSeed, ":").concat(getTagHashCode(tag))
  }, colorOptions));
}

function withTagCloudHandlers(elem, tag, cloudHandlers) {
  var origHandlers = (0, _helpers.pick)(elem.props, handlersPropNames);
  var props = (0, _helpers.keys)(cloudHandlers).reduce(function (acc, handlerName) {
    if (cloudHandlers[handlerName] || origHandlers[handlerName]) {
      acc[handlerName] = function (e) {
        cloudHandlers[handlerName] && cloudHandlers[handlerName](tag, e);
        origHandlers[handlerName] && origHandlers(e);
      };
    }

    return acc;
  }, {});
  return /*#__PURE__*/_react["default"].cloneElement(elem, props);
}

function renderTags(props, data) {
  var minSize = props.minSize,
      maxSize = props.maxSize;
  var counts = data.map(function (_ref2) {
    var tag = _ref2.tag;
    return tag.count;
  }),
      min = Math.min.apply(Math, _toConsumableArray(counts)),
      max = Math.max.apply(Math, _toConsumableArray(counts));
  var cloudHandlers = (0, _helpers.pick)(props, handlersPropNames);
  return data.map(function (_ref3) {
    var tag = _ref3.tag,
        color = _ref3.color;
    var fontSize = (0, _helpers.fontSizeConverter)(tag.count, min, max, minSize, maxSize);
    var elem = props.renderer(tag, fontSize, color);
    return withTagCloudHandlers(elem, tag, cloudHandlers);
  });
}

function randomize(props) {
  var tags = props.tags,
      shuffle = props.shuffle,
      randomSeed = props.randomSeed,
      randomNumberGenerator = props.randomNumberGenerator;
  var rng = randomSeed ? (0, _seedrandom["default"])(randomSeed) : randomNumberGenerator;
  var copy = tags.slice();
  var data = shuffle ? (0, _shuffleArray["default"])(copy, {
    rng: rng
  }) : copy;
  return data.map(function (tag) {
    return {
      tag: tag,
      color: generateColor(tag, props)
    };
  });
}

function TagCloud(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var tagsComparison = props.tags.map(getTagHashCode).join(':'); // randomize (color, shuffle) when tags or certain props change

  (0, _react.useEffect)(function () {
    setData(randomize(props));
  }, [props.colorOptions, props.randomSeed, props.shuffle, props.disableRandomColor, tagsComparison]);
  var other = (0, _helpers.omit)(props, [].concat(cloudPropNames, handlersPropNames));
  var Container = props.containerComponent;
  return /*#__PURE__*/_react["default"].createElement(Container, other, renderTags(props, data));
}

TagCloud.propTypes = {
  tags: _propTypes["default"].array.isRequired,
  maxSize: _propTypes["default"].number.isRequired,
  minSize: _propTypes["default"].number.isRequired,
  shuffle: _propTypes["default"].bool,
  colorOptions: _propTypes["default"].object,
  disableRandomColor: _propTypes["default"].bool,
  renderer: _propTypes["default"].func,
  className: _propTypes["default"].string,
  randomSeed: _propTypes["default"].any,
  randomNumberGenerator: _propTypes["default"].func,
  containerComponent: _propTypes["default"].elementType
};
TagCloud.defaultProps = {
  renderer: _defaultRenderer.defaultRenderer,
  shuffle: true,
  className: 'tag-cloud',
  colorOptions: {},
  containerComponent: 'div'
};