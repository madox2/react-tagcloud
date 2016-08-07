import React from "react";
import { TagCloud } from "../src/index";

const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

// default style class names are tag-cloud and tag-cloud-tag

// class name of the wrapping component can be overriden
// by passing `className` prop
// it is also possible to pass inline styles
export default () => (
  <TagCloud minSize={12}
            maxSize={35}
            tags={data}
            style={{width: 300}}
            className="myTagCloud" />
);

