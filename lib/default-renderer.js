"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _randomcolor = require("randomcolor");

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var defaultClassName = "tag-cloud-tag";

var defaultStyles = {
    margin: "0px 3px",
    verticalAlign: "middle",
    display: "inline-block"
};

var defaultTagRenderer = function defaultTagRenderer(tag) {
    return tag.value;
};

var defaultRenderer = function defaultRenderer(_ref) {
    var _ref$tagRenderer = _ref.tagRenderer;
    var tagRenderer = _ref$tagRenderer === undefined ? defaultTagRenderer : _ref$tagRenderer;
    var _ref$colorOptions = _ref.colorOptions;
    var colorOptions = _ref$colorOptions === undefined ? {} : _ref$colorOptions;
    var _ref$props = _ref.props;
    var props = _ref$props === undefined ? {} : _ref$props;
    return function (tag, size, key) {
        var className = defaultClassName,
            fontSize = size + "px",
            color = (0, _randomcolor2["default"])(colorOptions);

        var elementProps = Object.assign({}, { className: className }, props, { key: key });
        elementProps.style = Object.assign({}, defaultStyles, { color: color }, props.style, { fontSize: fontSize });

        return _react2["default"].createElement(
            "span",
            elementProps,
            tagRenderer(tag)
        );
    };
};

exports["default"] = function (options) {
    return defaultRenderer(options ? options : {});
};

module.exports = exports["default"];