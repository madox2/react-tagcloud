'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagCloud = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defaultRenderer = require('./defaultRenderer');

var _shuffleArray = require('shuffle-array');

var _shuffleArray2 = _interopRequireDefault(_shuffleArray);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventHandlers = ['onClick', 'onDoubleClick', 'onMouseMove'];
var cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'colorOptions', 'disableRandomColor', 'randomNumberGenerator'];

var generateColor = function generateColor(tag, _ref) {
  var disableRandomColor = _ref.disableRandomColor,
      colorOptions = _ref.colorOptions;

  if (tag.color) {
    return tag.color;
  }
  if (disableRandomColor) {
    return undefined;
  }
  return (0, _randomcolor2.default)(colorOptions);
};

var TagCloud = exports.TagCloud = function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  function TagCloud() {
    _classCallCheck(this, TagCloud);

    return _possibleConstructorReturn(this, (TagCloud.__proto__ || Object.getPrototypeOf(TagCloud)).apply(this, arguments));
  }

  _createClass(TagCloud, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var propsEqual = (0, _helpers.propertiesEqual)(this.props, newProps, Object.keys(TagCloud.propTypes));
      var tagsEqual = (0, _helpers.arraysEqual)(newProps.tags, this.props.tags);
      if (!tagsEqual || !propsEqual) {
        this._populate(newProps);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._populate(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _helpers.omitProps)(this.props, [].concat(cloudProps, eventHandlers));
      var tagElements = this._attachEventHandlers();
      return _react2.default.createElement(
        'div',
        props,
        tagElements
      );
    }
  }, {
    key: '_attachEventHandlers',
    value: function _attachEventHandlers() {
      var _this2 = this;

      var cloudHandlers = (0, _helpers.includeProps)(this.props, eventHandlers);
      return this._data.map(function (_ref2) {
        var tag = _ref2.tag,
            fontSize = _ref2.fontSize,
            color = _ref2.color;

        var elem = _this2.props.renderer(tag, fontSize, color);
        var tagHandlers = (0, _helpers.includeProps)(elem.props, eventHandlers);
        var globalHandlers = Object.keys(cloudHandlers).reduce(function (r, k) {
          r[k] = function (e) {
            cloudHandlers[k](tag, e);
            tagHandlers[k] && tagHandlers(e);
          };
          return r;
        }, {});
        return _react2.default.cloneElement(elem, globalHandlers);
      });
    }
  }, {
    key: '_populate',
    value: function _populate(props) {
      var tags = props.tags,
          shuffle = props.shuffle,
          minSize = props.minSize,
          maxSize = props.maxSize,
          randomNumberGenerator = props.randomNumberGenerator;

      var counts = tags.map(function (tag) {
        return tag.count;
      }),
          min = Math.min.apply(Math, _toConsumableArray(counts)),
          max = Math.max.apply(Math, _toConsumableArray(counts));
      var data = tags.map(function (tag) {
        return {
          tag: tag,
          color: generateColor(tag, props),
          fontSize: (0, _helpers.fontSizeConverter)(tag.count, min, max, minSize, maxSize)
        };
      });
      this._data = shuffle ? (0, _shuffleArray2.default)(data, { copy: true, rng: randomNumberGenerator }) : data;
    }
  }]);

  return TagCloud;
}(_react2.default.Component);

TagCloud.propTypes = {
  tags: _propTypes2.default.array.isRequired,
  maxSize: _propTypes2.default.number.isRequired,
  minSize: _propTypes2.default.number.isRequired,
  shuffle: _propTypes2.default.bool,
  colorOptions: _propTypes2.default.object,
  disableRandomColor: _propTypes2.default.bool,
  renderer: _propTypes2.default.func,
  className: _propTypes2.default.string,
  randomNumberGenerator: _propTypes2.default.func
};

TagCloud.defaultProps = {
  renderer: _defaultRenderer.defaultRenderer,
  shuffle: true,
  className: 'tag-cloud',
  colorOptions: {}
};