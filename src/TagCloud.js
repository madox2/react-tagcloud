import React from "react";
import { defaultRenderer } from "./defaultRenderer";
import objectAssign from "object-assign";
import arrayShuffle from "array-shuffle";

const omitted = ['tags', 'shuffle', 'renderer', 'maxSize', 'minSize', 'onClick'];
const omittedProps = omitted.reduce((r, k) => objectAssign(r, {[k]: undefined}), {});

const fontSizeConverter = (count, min, max, minSize, maxSize) =>
                             Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);

const createTags = ({tags, minSize, maxSize, renderer, onClick}) => {
  const counts = tags.map(tag => tag.count),
        min = Math.min.apply(Math, counts),
        max = Math.max.apply(Math, counts);
  const computeFontSize = tag => ({
    tag: tag,
    fontSize: fontSizeConverter(tag.count, min, max, minSize, maxSize)
  });
  const handlers = {onClick};
  const createComponent = ({tag, fontSize}, key) => renderer(tag, fontSize, key, handlers);
  return tags.map(computeFontSize)
             .map(createComponent);
};

export class TagCloud extends React.Component {
  render() {
    const props = objectAssign({}, this.props, omittedProps);
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
  className: "tag-cloud"
};
