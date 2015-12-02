#react-tagcloud
Tag/word cloud React component.

### Installation

```
npm install react-tagcloud
```

### Usage

```javascript
// For ES5
// var TagCloud = require('react-tagcloud').TagCloud;
// var DefaultRenderer = require('react-tagcloud').DefaultRenderer;
import {TagCloud, DefaultRenderer} from "react-tagcloud";

const data = [
    { value: "jQuery", count: 2 },
    { value: "SQL", count: 2 },
    { value: "JavaScript", count: 4 },
    { value: "React", count: 3 },
    { value: "Nodejs", count: 4 },
    { value: "Express.js", count: 2 },
    { value: "HTML5", count: 1 }
];

React.render(
    <TagCloud tags={data} levels={5} />
);
```
or modify behaviour of default renderer:

```javascript
const renderer = DefaultRenderer({
    props: {
        onClick: (e) => console.log("Hello word")
    },
    randomColorOptions: {
        luminosity: 'light',
        hue: 'blue'
    }
});

React.render(
    <TagCloud tags={data} levels={5} render={renderer} />
);
```

or use custom renderer:

```javascript
// renderer is function which takes tag, level,
// and item key as arguments and returns react element
const customRenderer = (tag, level, key) =>
                        <span key={key} className={`tag-${level}`}>{tag.value}</span>;

React.render(
    <TagCloud tags={data} levels={5} render={customRenderer} />
);
```

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)

