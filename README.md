#react-tagcloud
Simple tag/word cloud React component.

![preview tag-cloud preview](http://s27.postimg.org/ki0u7pe83/preview.png)

### Installation

```
npm install react-tagcloud
```

### Usage


```javascript
import {TagCloud, defaultRenderer} from "react-tagcloud";

const data = [
    { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
    { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
    { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
];

// creates tag cloud with max - min font size and onClick event handler
ReactDOM.render(
    <TagCloud minSize={12}
              maxSize={35}
              tags={data}
              onClick={tag => console.log('clicking on tag:', tag)} />,
    document.getElementById("basic-cloud")
);

// custom options - adds custom props and custom color options
const renderer = defaultRenderer({
    props: {
        style: {border: '1px solid silver', padding: '5px'},
        className: 'my-tag-class'
    },
    colorOptions: {
        luminosity: 'light',
        hue: 'blue'
    }
});
ReactDOM.render(
    <TagCloud minSize={12}
              maxSize={35}
              tags={data}
              renderer={renderer} />,
    document.getElementById("custom-renderer-options")
);

// tag-cloud using custom renderer
const customRenderer = (tag, size, key) => {
    return <span key={key} className={`tag-${size}`}>{tag.value}</span>;
};
ReactDOM.render(
    <TagCloud tags={data}
              minSize={1}
              maxSize={5}
              renderer={customRenderer} />,
    document.getElementById("custom-renderer")
);
```

* Color of tags is computed with [randomColor](https://github.com/davidmerfield/randomColor).
* See more in [./examples](https://github.com/madox2/react-tagcloud/tree/master/examples)

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)

