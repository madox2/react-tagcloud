import React from "react";
import ReactDOM from "react-dom";
import {TagCloud, defaultRenderer} from "../src/index";

const data = [
    { value: { name: "google", link: "http://google.com" }, count: 25 },
    { value: { name: "yahoo", link: "http://yahoo.com" }, count: 18 },
    { value: { name: "facebook", link: "http://facebook.com" }, count: 38 },
    { value: { name: "twitter", link: "http://twitter.com" }, count: 30 },
    { value: { name: "github", link: "http://github.com" }, count: 28 },
    { value: { name: "npmjs", link: "http://npmjs.com" }, count: 25 },
    { value: { name: "stackoverflow", link: "http://stackoverflow.com" }, count: 33 }
];

// with tagRenderer option it is possible to customize rendering of each tag

// tagRender is a function which takes tag as argument and returns react component or simple string
const tagRenderer = tag => (<a href={tag.value.link}>{tag.value.name}</a>);

const customizedDefaultRenderer = defaultRenderer({ tagRenderer });

ReactDOM.render(
    <TagCloud minSize={12}
              maxSize={35}
              tags={data}
              renderer={customizedDefaultRenderer} />,
    document.getElementById("custom-tag-renderer")
);

