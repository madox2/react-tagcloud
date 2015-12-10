import React from "react";
import DefaultRenderer from "./default-renderer";
import arrayShuffle from "array-shuffle";

const omittedElemProps = {
    tags: undefined, shuffle: undefined, renderer: undefined, maxSize: undefined, minSize: undefined
};

const fontSizeConverter = (count, min, max, minSize, maxSize) =>
                             Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);

const processTags = ({tags, minSize, maxSize, renderer}) => {
    const counts = tags.map(tag => tag.count),
             min = Math.min.apply(Math, counts),
             max = Math.max.apply(Math, counts);
    const computeFontSize = tag => ({
        tag: tag,
        fontSize: fontSizeConverter(tag.count, min, max, minSize, maxSize)
    });
    const createComponent = ({tag, fontSize}, key) => renderer(tag, fontSize, key);
    return tags.map(computeFontSize)
               .map(createComponent);
};

export default class TagCloud extends React.Component {
    render() {
        const props = Object.assign({}, this.props, omittedElemProps);
        const tags = processTags(this.props);
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
    renderer: DefaultRenderer(),
    shuffle: true,
    className: "tag-cloud"
};
