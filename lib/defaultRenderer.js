'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultRenderer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultRenderer = exports.defaultRenderer = function defaultRenderer() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return function (tag, size) {
    var handlers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var _options$tagRenderer = options.tagRenderer;
    var tagRenderer = _options$tagRenderer === undefined ? function (tag) {
      return tag.value;
    } : _options$tagRenderer;
    var _options$colorOptions = options.colorOptions;
    var colorOptions = _options$colorOptions === undefined ? {} : _options$colorOptions;
    var _options$disableRando = options.disableRandomColor;
    var disableRandomColor = _options$disableRando === undefined ? false : _options$disableRando;
    var _options$props = options.props;
    var props = _options$props === undefined ? {} : _options$props;


    if (props.disableRandomColor) {
      // eslint-disable-next-line no-console
      console.warn("Using deprecated property 'disableRandomColor' passed to prop option of defaultRenderer. " + "It will be removed in the next major release and replaced with it's own option 'disableRandomColor'.");
    }

    var className = 'tag-cloud-tag';
    var fontSize = size + 'px';
    var color = props.disableRandomColor || disableRandomColor ? tag.color || undefined : (0, _randomcolor2.default)(colorOptions);
    var key = tag.key || tag.value;
    var style = (0, _objectAssign2.default)({}, styles, { color: color }, props.style, { fontSize: fontSize });

    var eventHandlers = {};
    Object.keys(handlers).forEach(function (key) {
      return handlers[key] && (eventHandlers[key] = function (e) {
        return handlers[key](tag, e);
      });
    });

    var elementProps = (0, _objectAssign2.default)({}, { className: className }, eventHandlers, props, { style: style }, { key: key });

    return _react2.default.createElement(
      'span',
      elementProps,
      tagRenderer(tag)
    );
  };
};

var styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};