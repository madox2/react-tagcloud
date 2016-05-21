import React from "react";
import randomColor from "randomcolor";
import objectAssign from "object-assign";

const defaultClassName = "tag-cloud-tag";

const defaultStyles = {
  margin: "0px 3px",
  verticalAlign: "middle",
  display: "inline-block"
};

const defaultTagRenderer = tag => tag.value;


export const defaultRenderer = ({ tagRenderer = defaultTagRenderer, colorOptions = {}, props = {} } = {}) => (tag, size, key, handlers = {}) => {
  const className = defaultClassName,
        fontSize = size + "px",
        color = props.disableRandomColor ? tag.color || 'black' : randomColor(colorOptions);

  const eventHandlers = {};
  Object.keys(handlers).forEach(key => handlers[key] && (eventHandlers[key] = (e) => handlers[key](tag, e)));

  const elementProps = objectAssign({}, {className}, eventHandlers, props, {key});
  elementProps.style = objectAssign({}, defaultStyles, {color}, props.style, {fontSize});

  return <span {...elementProps}>{tagRenderer(tag)}</span>;
};

