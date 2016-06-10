import React from 'react';
import randomColor from 'randomcolor';
import objectAssign from 'object-assign';

export const defaultRenderer = (options = {}) => (tag, size, handlers = {}) => {
  const {
    tagRenderer = tag => tag.value,
    colorOptions = {},
    disableRandomColor = false,
    props = {}
  } = options;

  if (props.disableRandomColor) {
    // eslint-disable-next-line no-console
    console.warn("Using deprecated property 'disableRandomColor' passed to prop option of defaultRenderer. "
               + "It will be removed in the next major release and replaced with it's own option 'disableRandomColor'.");
  }

  const className =  'tag-cloud-tag';
  const fontSize = size + 'px';
  const color = (props.disableRandomColor || disableRandomColor) ? tag.color || undefined : randomColor(colorOptions);
  const key = tag.key || tag.value;
  const style = objectAssign({}, styles, {color}, props.style, {fontSize});

  const eventHandlers = {};
  Object.keys(handlers).forEach(key => handlers[key] && (eventHandlers[key] = (e) => handlers[key](tag, e)));

  const elementProps = objectAssign({}, {className}, eventHandlers, props, {style}, {key});

  return <span {...elementProps}>{tagRenderer(tag)}</span>;
};

const styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block'
};

