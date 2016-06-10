#react-tagcloud

Simple and extensible tag/word cloud React component.

![preview tag-cloud preview](http://s27.postimg.org/ki0u7pe83/preview.png)

## Installation

```
npm install react-tagcloud
```

## Basic usage

```javascript
import { TagCloud } from "react-tagcloud";

const data = [
  { value: "JavaScript", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "CSS3", count: 20 }
];

const SimpleCloud = () => (
  <TagCloud minSize={12}
            maxSize={35}
            tags={data}
            onClick={tag => console.log('clicking on tag:', tag)} />
);
```

## API

### Options

TagCloud accepts options below, however you can pass any other option to the component and it will be passed to the wrapping `<div />` component.
Other cloud properties like color options or custom tag properties can be adjusted using [default renderer](#default-renderer).

| Option | Type | Required | Note |
|-----------|----------|--------|---|
|`tags`     |`Array`   |`true`|Array of objects representing tags. Each object have to contain `value` (`String`), `count` (`Number`) and optional `key` (`String`) property|
|`maxSize`  |`Number`  |`true`|Maximal font size (px) used in cloud|
|`minSize`  |`Number`  |`true`|Minimal font size (px) used in cloud|
|`shuffle`  |`Boolean` |`false`|If true, tags are shuffled. When tag data are modified, cloud is re-shuffled. Default: `true`|
|`renderer` |`Function`|`false`|Function used to render each tag. Default: `defaultRenderer()`|

**Note:** `key` property of tag object is used as tag element key. If it is not provided, the `value` property is used instead. In this case it can fail if you don't have unique tag values. I highly recommed to use `key` property if you are not sure that tag values will be unique.

### Events

Event handlers can be passed to the TagCloud props.
Each handler has two arguments, the first is related tag object and the second is DOM event object.

Currently supported events: `onClick`, `onDoubleClick`, `onMouseMove`

### Renderer

Rendering of tags can be fully customized by providing custom render function and passing it to the `renderer` prop.
Render function takes three arguments - `tag`, `size` and `eventHandlers`.
In order to make events work, it is important to pass `eventHandlers` to the element props.
For example:

```javascript
import { TagCloud } from "react-tagcloud";

const customRenderer = (tag, size, handlers) => {
  return <span {...handlers} key={tag.value} className={`tag-${size}`}>{tag.value}</span>;
};

const CustomizedCloud () => (
  <TagCloud tags={data}
            minSize={1}
            maxSize={5}
            renderer={customRenderer} />
);
```

### Default renderer

By default TagCloud uses customizable renderer to render each tag element.
It offers basic styling, random tag coloring (using [randomColor](https://github.com/davidmerfield/randomColor)) and other options.
Default renderer is created with exported `defaultRenderer` factory function which takes one option argument described below:

| Property | Type | Note |
|-----------|----------|---|
|`colorOptions`        |`Object`  |Random color options (see [randomColor#options](https://github.com/davidmerfield/randomColor#options))|
|`disableRandomColor`  |`Boolean` |If `true`, random color is not used|
|`props`               |`Object`  |Any properties to be passed to the underlying `<span />` element|
|`tagRenderer`         |`Function`|Simplified function to render tag. Takes tag object as argument and returns react element|

Example using customized default renderer:

```javascript
import { TagCloud, defaultRenderer } from "react-tagcloud";

const renderer = defaultRenderer({
  props: {
    style: { border: '1px solid silver', padding: '5px' },
    className: 'my-tag-class'
  },
  colorOptions: {
    luminosity: 'light',
    hue: 'blue'
  }
});

const CustomOptionsCloud = () => (
  <TagCloud minSize={12}
            maxSize={35}
            tags={data}
            renderer={renderer} />
);
```

## More examples

* [Simple tag cloud](https://github.com/madox2/react-tagcloud/blob/master/examples/simple-cloud.js)
* [Custom props](https://github.com/madox2/react-tagcloud/blob/master/examples/custom-props.js)
* [Default renderer (color options, custom props)](https://github.com/madox2/react-tagcloud/blob/master/examples/default-renderer.js)
* [Default renderer (custom tag renderer)](https://github.com/madox2/react-tagcloud/blob/master/examples/custom-tag-renderer.js)
* [Custom renderer](https://github.com/madox2/react-tagcloud/blob/master/examples/custom-renderer.js)

## Testing

Install dev modules:

```
npm install
```

### Run unit tests

```
npm test
```

### Run examples

```
npm start
```

and open browser at `http://localhost:8080`

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)
