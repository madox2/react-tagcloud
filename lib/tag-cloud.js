import React from "react";
import DefaultRenderer from "./default-renderer";
import arrayShuffle from "array-shuffle";

/**
 * react-tagcould
 */

// TODO: package json refinement
// TODO: push to github
// TODO: initial version?
// TODO: readme file
// TODO: examples
// TODO: publis to the npm
// TODO: test in multiple browsers
// TODO: alternative fontSizeGenerator - with min, max fontSize (see wikipedia)
// TODO: implement some tag cloud algorithm

const defaultLevelFunction = (tag, levels, min, max) => Math.round((tag.count - min) / ((max - min) / levels));

const omittedElemProps = {
    tags: undefined, levels: undefined, shuffle: undefined, levelFunction: undefined, renderer: undefined
};

function processTags({tags, levels, renderer, levelFunction}) {
    const counts = tags.map(tag => tag.count),
            min = Math.min.apply(Math, counts),
            max = Math.max.apply(Math, counts);
    const computeLevel = tag => ({
        tag: tag,
        level: levelFunction(tag, levels, min, max)
    });
    const createComponent = ({tag, level}, key) => renderer(tag, level, key);
    return tags.map(computeLevel)
                .map(createComponent);
}

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
    levels: React.PropTypes.number.isRequired,
    shuffle: React.PropTypes.bool,
    levelFunction: React.PropTypes.func,
    renderer: React.PropTypes.func,
    className: React.PropTypes.string
}

TagCloud.defaultProps = {
    renderer: DefaultRenderer(),
    levelFunction: defaultLevelFunction,
    shuffle: true,
    className: "tag-cloud"
};
