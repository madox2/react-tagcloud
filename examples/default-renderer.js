import React from "react";
import ReactDOM from "react-dom";
import {TagCloud, defaultRenderer} from "../src/index";

const data = [
    { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
    { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
    { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

// defaultRenderer funciton creates default renderer implementation with custom options
// usage of tagRenderer option is described in ./custom-tag-renderer.js

// custom props will be applied on each tag component
const props = {
    style: {border: '1px solid silver', padding: '5px'},
    className: 'my-tag-class'
};

// custom random color options
// see randomColor package: https://github.com/davidmerfield/randomColor
const colorOptions = {
    luminosity: 'light',
    hue: 'blue'
};

const customizedDefaultRenderer = defaultRenderer({ props, colorOptions });

ReactDOM.render(
    <TagCloud minSize={12}
              maxSize={35}
              tags={data}
              renderer={customizedDefaultRenderer} />,
    document.getElementById("default-renderer")
);

