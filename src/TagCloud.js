import React from 'react';
import { defaultRenderer } from './defaultRenderer';
import arrayShuffle from 'array-shuffle';
import { omitProps, includeProps, fontSizeConverter, arraysEqual } from './helpers';

const eventHandlers = ['onClick', 'onDoubleClick', 'onMouseMove'];
const cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize'];

export class TagCloud extends React.Component {

  componentWillReceiveProps({ shuffle, tags }) {
    if (!shuffle) {
      this._tags = tags;
      return;
    }
    if (shuffle && shuffle !== this.props.shuffle) {
      this._tags = arrayShuffle(tags);
      return;
    }
    if (shuffle && !arraysEqual(tags, this.props.tags)) {
      this._tags = arrayShuffle(tags);
    }
  }

  componentWillMount() {
    const { tags, shuffle } = this.props;
    this._tags = shuffle ? arrayShuffle(tags) : tags;
  }

  render() {
    const props = omitProps(this.props, [...cloudProps, ...eventHandlers]);
    return (
      <div {...props}>
        { this._createTags() }
      </div>
    );
  }

  _createTags() {
    const { minSize, maxSize, renderer } = this.props;
    const handlers = includeProps(this.props, eventHandlers);
    const counts = this._tags.map(tag => tag.count),
          min = Math.min(...counts),
          max = Math.max(...counts);
    return this._tags.map(tag => {
      const fontSize = fontSizeConverter(tag.count, min, max, minSize, maxSize);
      return renderer(tag, fontSize, handlers);
    });
  }

}

TagCloud.propTypes = {
  tags: React.PropTypes.array.isRequired,
  maxSize: React.PropTypes.number.isRequired,
  minSize: React.PropTypes.number.isRequired,
  shuffle: React.PropTypes.bool,
  renderer: React.PropTypes.func,
  className: React.PropTypes.string
};

TagCloud.defaultProps = {
  renderer: defaultRenderer(),
  shuffle: true,
  className: 'tag-cloud'
};
