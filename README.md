#react-tagcloud
Tag/word cloud React component.

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
    { value: "jQuery", count: 2 }, { value: "SQL", count: 2 },
    { value: "JavaScript", count: 4 }, { value: "React", count: 3 },
    { value: "Nodejs", count: 4 }, { value: "Express.js", count: 2 },
    { value: "HTML5", count: 1 }, { value: "CSS3", count: 1 }
];

React.render(
    <TagCloud tags={data} minSize={12} maxSize={35} />
);
```
or modify behaviour of default renderer:

```javascript
const renderer = DefaultRenderer({
    props: {
        onClick: (e) => console.log("Hello word")
    },
    colorOptions: {
        luminosity: 'light',
        hue: 'blue'
    }
});

React.render(
    <TagCloud tags={data} minSize={12} maxSize={35} render={renderer} />
);
```

or use custom renderer:

```javascript
const customRenderer = (tag, fontSize, key) => {
    return <span key={key} className={`tag-${fontSize}`}>{tag.value}</span>;
};

React.render(
    <TagCloud tags={data} minSize={1} maxSize={5} render={customRenderer} />
);
```

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)

