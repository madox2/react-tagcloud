import React from 'react';
import randomColor from 'randomcolor';
import objectAssign from 'object-assign';

export const defaultRenderer = (options = {}) => (tag, size, key, handlers = {}) => {
  const {
    tagRenderer = tag => tag.value,
    colorOptions = {},
    props = {}
  } = options;

  const className =  'tag-cloud-tag';
  const fontSize = size + 'px';
  const color = props.disableRandomColor ? tag.color || 'black' : randomColor(colorOptions);

  const eventHandlers = {};
  Object.keys(handlers).forEach(key => handlers[key] && (eventHandlers[key] = (e) => handlers[key](tag, e)));

  const elementProps = objectAssign({}, {className}, eventHandlers, props, {key});
  elementProps.style = objectAssign({}, styles, {color}, props.style, {fontSize});

  return <span {...elementProps}>{tagRenderer(tag)}</span>;
};

const styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};

