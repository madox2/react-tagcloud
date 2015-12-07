import React from "react";
import ReactDOM from "react-dom";
import {TagCloud, DefaultRenderer} from "../src/index";

const data = [
    { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
    { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
    { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

ReactDOM.render(
    // minSize, maxSize - font size in px
    // tags - array of objects with properties value and count
    <TagCloud minSize={12} maxSize={35} tags={data} />,
    document.getElementById("simple-cloud")
);

