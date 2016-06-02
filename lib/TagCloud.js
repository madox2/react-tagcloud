'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloud = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultRenderer = require('./defaultRenderer');

var _arrayShuffle = require('array-shuffle');

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createTags = function createTags(props) {
  var tags = props.tags;
  var minSize = props.minSize;
  var maxSize = props.maxSize;
  var renderer = props.renderer;

  var handlers = (0, _helpers.includeProps)(props, eventHandlers);
  var counts = tags.map(function (tag) {
    return tag.count;
  }),
      min = Math.min.apply(Math, _toConsumableArray(counts)),
      max = Math.max.apply(Math, _toConsumableArray(counts));
  var computeFontSize = function computeFontSize(tag) {
    return {
      tag: tag,
      fontSize: (0, _helpers.fontSizeConverter)(tag.count, min, max, minSize, maxSize)
    };
  };
  var createComponent = function createComponent(_ref, key) {
    var tag = _ref.tag;
    var fontSize = _ref.fontSize;
    return renderer(tag, fontSize, key, handlers);
  };
  return tags.map(computeFontSize).map(createComponent);
};

var eventHandlers = ['onClick', 'onDoubleClick', 'onMouseMove'];
var cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize'];

var TagCloud = exports.TagCloud = function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  function TagCloud() {
    _classCallCheck(this, TagCloud);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TagCloud).apply(this, arguments));
  }

  _createClass(TagCloud, [{
    key: 'render',
    value: function render() {
      var props = (0, _helpers.omitProps)(this.props, [].concat(cloudProps, eventHandlers));
      var tags = createTags(this.props);
      return _react2.default.createElement(
        'div',
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
  className: 'tag-cloud'
};