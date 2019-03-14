import React from 'react';
import PropTypes from 'prop-types';
import { defaultRenderer } from './defaultRenderer';
import arrayShuffle from 'shuffle-array';
import randomColor from 'randomcolor';
import { omitProps, includeProps, fontSizeConverter, arraysEqual, propertiesEqual } from './helpers';

const eventHandlers = ['onClick', 'onDoubleClick', 'onMouseMove'];
const cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'colorOptions', 'disableRandomColor', 'randomNumberGenerator'];

const generateColor = (tag, {disableRandomColor, colorOptions}) => {
  if (tag.color) {
    return tag.color;
  }
  if (disableRandomColor) {
    return undefined;
  }
  return randomColor(colorOptions);
};

export class TagCloud extends React.Component {

  componentWillReceiveProps(newProps) {
    const propsEqual = propertiesEqual(this.props, newProps, Object.keys(TagCloud.propTypes))
    const tagsEqual = arraysEqual(newProps.tags, this.props.tags);
    if (!tagsEqual || !propsEqual) {
      this._populate(newProps);
    }
  }

  componentWillMount() {
    this._populate(this.props);
  }

  render() {
    const props = omitProps(this.props, [...cloudProps, ...eventHandlers]);
    const tagElements = this._attachEventHandlers();
    return (
      <div {...props}>
      { tagElements }
      </div>
    );
  }

  _attachEventHandlers() {
    const cloudHandlers = includeProps(this.props, eventHandlers);
    return this._data.map(({tag, fontSize, color}) => {
      const elem = this.props.renderer(tag, fontSize, color);
      const tagHandlers = includeProps(elem.props, eventHandlers);
      const globalHandlers = Object.keys(cloudHandlers).reduce((r, k) => {
        r[k] = e => {
          cloudHandlers[k](tag, e);
          tagHandlers[k] && tagHandlers(e);
        }
        return r;
      }, {});
      return React.cloneElement(elem, globalHandlers);
    });
  }

  _populate(props) {
    const { tags, shuffle, minSize, maxSize, randomNumberGenerator } = props;
    const counts = tags.map(tag => tag.count),
          min = Math.min(...counts),
          max = Math.max(...counts);
    const data = tags.map(tag => ({
      tag,
      color: generateColor(tag, props),
      fontSize: fontSizeConverter(tag.count, min, max, minSize, maxSize)
    }));
    this._data = shuffle ? arrayShuffle(data, { copy: true, rng: randomNumberGenerator }) : data;
  }

}

TagCloud.propTypes = {
  tags: PropTypes.array.isRequired,
  maxSize: PropTypes.number.isRequired,
  minSize: PropTypes.number.isRequired,
  shuffle: PropTypes.bool,
  colorOptions: PropTypes.object,
  disableRandomColor: PropTypes.bool,
  renderer: PropTypes.func,
  className: PropTypes.string,
  randomNumberGenerator: PropTypes.func,
};

TagCloud.defaultProps = {
  renderer: defaultRenderer,
  shuffle: true,
  className: 'tag-cloud',
  colorOptions: {}
};
