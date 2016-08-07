import React from "react";
import { TagCloud } from "../src/index";

const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

const keyframes = `
@keyframes blinker {
  50% { opacity: 0.0; }
}`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

// custom renderer is function which has tag, computed font size and
// color as arguments, and returns react component which represents tag
const customRenderer = (tag, size, color) => (
  <span key={tag.value}
        style={{
          animation: 'blinker 3s linear infinite',
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${size}em`,
          border: `2px solid ${color}`,
          margin: '3px',
          padding: '3px',
          display: 'inline-block'
        }}>{tag.value}</span>
);

export default () => (
  <TagCloud tags={data}
            minSize={1}
            maxSize={2}
            renderer={customRenderer} />
);

