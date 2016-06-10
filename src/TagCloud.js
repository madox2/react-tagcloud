import React from 'react';
import { defaultRenderer } from './defaultRenderer';
import arrayShuffle from 'array-shuffle';
import { omitProps, includeProps, fontSizeConverter, arraysEqual } from './helpers';

const createTags = (tags, props) => {
  const {minSize, maxSize, renderer} = props;
  const handlers = includeProps(props, eventHandlers);
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
    const tags = createTags(this._tags, this.props);
    return (
      <div {...props}>
        {tags}
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
