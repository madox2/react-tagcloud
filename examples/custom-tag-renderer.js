import React from "react";
import { TagCloud, defaultRenderer } from "../src/index";

const data = [
  { value: "google", link: "http://google.com", count: 25 },
  { value: "yahoo", link: "http://yahoo.com", count: 18 },
  { value: "facebook", link: "http://facebook.com", count: 38 },
  { value: "twitter", link: "http://twitter.com", count: 30 },
  { value: "github", link: "http://github.com", count: 28 },
  { value: "npmjs", link: "http://npmjs.com", count: 25 },
  { value: "stackoverflow", link: "http://stackoverflow.com", count: 33 }
];

// with tagRenderer option it is possible to customize rendering of each tag

// tagRender is a function which takes tag as argument and returns react component or simple string
const tagRenderer = tag => (<a href={tag.link}>{tag.value}</a>);

const customizedDefaultRenderer = defaultRenderer({ tagRenderer });

export default() => (
  <TagCloud minSize={12}
            maxSize={35}
            tags={data}
            renderer={customizedDefaultRenderer} />
);

