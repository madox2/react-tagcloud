"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloud = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _defaultRenderer = require("./defaultRenderer");

var _objectAssign2 = require("object-assign");

var _objectAssign3 = _interopRequireDefault(_objectAssign2);

var _arrayShuffle = require("array-shuffle");

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var omitted = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'onClick'];
var omittedProps = omitted.reduce(function (r, k) {
  return (0, _objectAssign3.default)(r, _defineProperty({}, k, undefined));
}, {});

var fontSizeConverter = function fontSizeConverter(count, min, max, minSize, maxSize) {
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};

var createTags = function createTags(_ref) {
  var tags = _ref.tags;
  var minSize = _ref.minSize;
  var maxSize = _ref.maxSize;
  var renderer = _ref.renderer;
  var onClick = _ref.onClick;

  var counts = tags.map(function (tag) {
    return tag.count;
  }),
      min = Math.min.apply(Math, counts),
      max = Math.max.apply(Math, counts);
  var computeFontSize = function computeFontSize(tag) {
    return {
      tag: tag,
      fontSize: fontSizeConverter(tag.count, min, max, minSize, maxSize)
    };
  };
  var handlers = { onClick: onClick };
  var createComponent = function createComponent(_ref2, key) {
    var tag = _ref2.tag;
    var fontSize = _ref2.fontSize;
    return renderer(tag, fontSize, key, handlers);
  };
  return tags.map(computeFontSize).map(createComponent);
};

var TagCloud = exports.TagCloud = function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  function TagCloud() {
    _classCallCheck(this, TagCloud);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TagCloud).apply(this, arguments));
  }

  _createClass(TagCloud, [{
    key: "render",
    value: function render() {
      var props = (0, _objectAssign3.default)({}, this.props, omittedProps);
      var tags = createTags(this.props);
      return _react2.default.createElement(
        "div",
        props,
        this.props.shuffle ? (0, _arrayShuffle2.default)(tags) : tags
      );
    }
  }]);

  return TagCloud;
}(_react2.default.Component);

TagCloud.propTypes = {
  tags: _react2.default.PropTypes.array.isRequired,
  maxSize: _react2.default.PropTypes.number.isRequired,
  minSize: _react2.default.PropTypes.number.isRequired,
  shuffle: _react2.default.PropTypes.bool,
  renderer: _react2.default.PropTypes.func,
  className: _react2.default.PropTypes.string
};

TagCloud.defaultProps = {
  renderer: (0, _defaultRenderer.defaultRenderer)(),
  shuffle: true,
  className: "tag-cloud"
};