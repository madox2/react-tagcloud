import React from "react";
import { TagCloud } from "react-tagcloud";

const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

// custom random color options
// see randomColor package: https://github.com/davidmerfield/randomColor
const options = {
  luminosity: 'light',
  hue: 'blue'
};

export default () => (
  <TagCloud minSize={12}
            maxSize={35}
            colorOptions={options}
            className='my-tag-class'
            tags={data}
            onClick={tag => console.log('clicking on tag:', tag)} />
);

