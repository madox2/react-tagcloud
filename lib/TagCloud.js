'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TagCloud = TagCloud;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shuffleArray = require('shuffle-array');

var _shuffleArray2 = _interopRequireDefault(_shuffleArray);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _defaultRenderer = require('./defaultRenderer');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var handlersPropNames = ['onClick', 'onDoubleClick', 'onMouseMove'];
var cloudPropNames = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'colorOptions', 'disableRandomColor', 'randomNumberGenerator'];
var randomizeDeps = ['colorOptions', 'shuffle', 'disableRandomColor'];

function generateColor(tag, _ref) {
  var disableRandomColor = _ref.disableRandomColor,
      colorOptions = _ref.colorOptions;

  if (tag.color) {
    return tag.color;
  }
  if (disableRandomColor) {
    return undefined;
  }
  return (0, _randomcolor2.default)(colorOptions);
}

function withTagCloudHandlers(elem, tag, cloudHandlers) {
  var origHandlers = (0, _helpers.pick)(elem.props, handlersPropNames);
  var props = (0, _helpers.keys)(cloudHandlers).reduce(function (acc, handlerName) {
    acc[handlerName] = function (e) {
      cloudHandlers[handlerName] && cloudHandlers[handlerName](tag, e);
      origHandlers[handlerName] && origHandlers(e);
    };
    return acc;
  }, {});
  return _react2.default.cloneElement(elem, props);
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
      randomNumberGenerator = props.randomNumberGenerator;

  var data = tags.map(function (tag) {
    return {
      tag: tag,
      color: generateColor(tag, props)
    };
  });
  return shuffle ? (0, _shuffleArray2.default)(data, { rng: randomNumberGenerator }) : data;
}

function TagCloud(props) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];
  // randomize (color, shuffle) when tags or props change


  (0, _react.useEffect)(function () {
    setData(randomize(props));
  }, [].concat(_toConsumableArray((0, _helpers.values)((0, _helpers.pick)(props, randomizeDeps))), [props.tags.length]));
  var other = (0, _helpers.omit)(props, [].concat(cloudPropNames, handlersPropNames));
  return _react2.default.createElement(
    'div',
    other,
    renderTags(props, data)
  );
}

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