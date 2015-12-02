import React from "react";
import ReactDOM from "react-dom";
import {TagCloud, DefaultRenderer} from "../src/index";

const tags = [
    { value: "jQuery", count: 2 },
    { value: "SQL", count: 2 },
    { value: "JavaScript", count: 4 },
    { value: "React", count: 3 },
    { value: "Nodejs", count: 4 },
    { value: "Express.js", count: 2 },
    { value: "HTML5", count: 1 }
];

const renderer = DefaultRenderer({
    props: {
        onClick: (e) => console.log("Hello word")
    }
});

ReactDOM.render(
    <TagCloud levels={5} tags={tags} style={{width: 300}} renderer={renderer} />, document.getElementById("examples")
);
