#react-tagcloud
Simple tag/word cloud React component.

![preview tag-cloud preview](http://s27.postimg.org/ki0u7pe83/preview.png)

### Installation

```
npm install react-tagcloud
```

### Usage


```javascript
// For ES5 use:
// var TagCloud = require('react-tagcloud').TagCloud;
// var DefaultRenderer = require('react-tagcloud').DefaultRenderer;
import {TagCloud, DefaultRenderer} from "react-tagcloud";

const data = [
    { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
    { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
    { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

ReactDOM.render(
    <TagCloud tags={data} minSize={12} maxSize={35} />,
    element
);
```

or modify behaviour of default renderer:


```javascript
const renderer = new DefaultRenderer({
    props: {
        onClick: (e) => console.log("Hello world")
    },
    colorOptions: {
        luminosity: 'light',
        hue: 'blue'
    }
});

ReactDOM.render(
    <TagCloud tags={data} minSize={12} maxSize={35} render={renderer} />,
    element
);
```

or use custom renderer:

```javascript
const customRenderer = (tag, size, key) => {
    return <span key={key} className={`tag-${size}`}>{tag.value}</span>;
};

ReactDOM.render(
    <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} />,
    element
);
```

see more in [./examples](https://github.com/madox2/react-tagcloud/tree/master/examples)

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)

