import React from 'react';
import { defaultRenderer } from './defaultRenderer';
import arrayShuffle from 'array-shuffle';
import { omitProps, fontSizeConverter } from './helpers';

const eventHandlers = ['onClick'];
const cloudProps = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize'];

const createTags = ({tags, minSize, maxSize, renderer, onClick}) => {
  const handlers = {onClick};
  const counts = tags.map(tag => tag.count),
        min = Math.min(...counts),
        max = Math.max(...counts);
  const computeFontSize = tag => ({
    tag: tag,
    fontSize: fontSizeConverter(tag.count, min, max, minSize, maxSize)
  });
  const createComponent = ({tag, fontSize}, key) => renderer(tag, fontSize, key, handlers);
  return tags.map(computeFontSize)
             .map(createComponent);
};

export class TagCloud extends React.Component {
  render() {
    const props = omitProps(this.props, [...cloudProps, ...eventHandlers]);
    const tags = createTags(this.props);
    return (
      <div {...props}>
        {this.props.shuffle ? arrayShuffle(tags) : tags}
      </div>
    );
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
