import React from "react";
import randomColor from "randomcolor";

const defaultClassName = "tag-cloud-tag";

const defaultStyles = {
    margin: "0px 3px",
    verticalAlign: "middle",
    display: "inline-block"
};

const defaultTagRenderer = tag => tag.value;


export default ({ tagRenderer = defaultTagRenderer, colorOptions = {}, props = {} } = {}) =>
                                                             (tag, size, key, handlers = {}) => {
    const className = defaultClassName,
           fontSize = size + "px",
              color = randomColor(colorOptions);

    const eventHandlers = {};
    Object.keys(handlers).forEach(key => handlers[key] && (eventHandlers[key] = (e) => handlers[key](tag, e)));

    const elementProps = Object.assign({}, {className}, eventHandlers, props, {key});
    elementProps.style = Object.assign({}, defaultStyles, {color}, props.style, {fontSize});

    return <span {...elementProps}>{tagRenderer(tag)}</span>;
};

