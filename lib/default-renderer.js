import React from "react";
import randomColor from "randomcolor";

const defaultClassName = "tag-cloud-tag";

const defaultStyles = {
    margin: "0px 3px",
    verticalAlign: "middle",
    display: "inline-block"
};

const defaultFontSizeGenerator = level => `${0.8 + (level * 0.3)}em`;

const defaultTagRenderer = value => value.value;

const defaultRenderer = ({
    fontSizeGenerator = defaultFontSizeGenerator,
    tagRenderer = defaultTagRenderer,
    randomColorOptions = {},
    props = {}
}) => (tag, level, key) => {
    const fontSize = fontSizeGenerator(level),
          className = defaultClassName,
          color = randomColor(randomColorOptions);

    const elementProps = Object.assign({}, {className}, props, {key});
    elementProps.style = Object.assign({}, defaultStyles, {color}, props.style, {fontSize});

    return <span {...elementProps}>{tagRenderer(tag)}</span>;
};

export default options => defaultRenderer(options ? options : {});

