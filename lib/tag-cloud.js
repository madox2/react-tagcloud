"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _defaultRenderer = require("./default-renderer");

var _defaultRenderer2 = _interopRequireDefault(_defaultRenderer);

var _arrayShuffle = require("array-shuffle");

var _arrayShuffle2 = _interopRequireDefault(_arrayShuffle);

var omitted = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'onClick'];
var omittedProps = omitted.reduce(function (r, k) {
    return Object.assign(r, _defineProperty({}, k, undefined));
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

var TagCloud = (function (_React$Component) {
    _inherits(TagCloud, _React$Component);

    function TagCloud() {
        _classCallCheck(this, TagCloud);

        _get(Object.getPrototypeOf(TagCloud.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TagCloud, [{
        key: "render",
        value: function render() {
            var props = Object.assign({}, this.props, omittedProps);
            var tags = createTags(this.props);
            return _react2["default"].createElement(
                "div",
                props,
                this.props.shuffle ? (0, _arrayShuffle2["default"])(tags) : tags
            );
        }
    }]);

    return TagCloud;
})(_react2["default"].Component);

exports["default"] = TagCloud;

TagCloud.propTypes = {
    tags: _react2["default"].PropTypes.array.isRequired,
    maxSize: _react2["default"].PropTypes.number.isRequired,
    minSize: _react2["default"].PropTypes.number.isRequired,
    shuffle: _react2["default"].PropTypes.bool,
    renderer: _react2["default"].PropTypes.func,
    className: _react2["default"].PropTypes.string
};

TagCloud.defaultProps = {
    renderer: (0, _defaultRenderer2["default"])(),
    shuffle: true,
    className: "tag-cloud"
};
module.exports = exports["default"];