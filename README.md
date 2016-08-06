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

TagCloud accepts options below, however you can pass any other option to the component and it will be passed forward to the wrapping `<div />` component.

| Option | Type | Required | Note |
|-----------|----------|--------|---|
|`tags`              |`Array`   |`true`|Array of objects representing tags (see [Tag object](#tag-object))|
|`maxSize`           |`Number`  |`true` |Maximal font size (px) used in cloud|
|`minSize`           |`Number`  |`true` |Minimal font size (px) used in cloud|
|`shuffle`           |`Boolean` |`false`|If true, tags are shuffled. When tag data are modified, cloud is re-shuffled. Default: `true`|
|`colorOptions`      |`Object`  |`false`|Random color options (see [randomColor#options](https://github.com/davidmerfield/randomColor#options))|
|`disableRandomColor`|`Boolean` |`false`|If `true`, random color is not used|
|`shuffle`           |`Boolean` |`false`|If true, tags are shuffled. When tag data are modified, cloud is re-shuffled. Default: `true`|
|`renderer`          |`Function`|`false`|Function used to render each tag|

### Tag object

Each tag is represented by object containing properties:

| Property | Type | Required | Note |
|----------|------|----------|------|
|`value`|`String`|`true` |Tag's value to be displayed|
|`count`|`Number`|`true` |Represents frequency of the tag. It is used to calculate tag size|
|`key`  |`String`|`false`|This property is used as element key. If it is not provided, the `value` property is used instead. In this case it can fail if you don't have unique tag values. I highly recommed to use `key` property if you are not sure that tag values will be unique|
|`color`|`String`|`false`|Represents color of the tag. If it is not provided, random color will be used instead|

### Events

Event handlers can be passed to the TagCloud props.
Each handler has two arguments, the first is related tag object and the second is DOM event object.

Currently supported events: `onClick`, `onDoubleClick`, `onMouseMove`

### Renderer

Rendering of tags can be fully customized by providing custom render function and passing it to the `renderer` prop.
Render function has three arguments - `tag`, `size` and `color`.
For example:

```javascript
import { TagCloud } from "react-tagcloud";

const customRenderer = (tag, size, color) => {
  return <span key={tag.value} style={{color}} className={`tag-${size}`}>{tag.value}</span>;
};

const CustomizedCloud () => (
  <TagCloud tags={data}
            minSize={1}
            maxSize={5}
            renderer={customRenderer} />
);
```

## More examples

* [Simple tag cloud](https://github.com/madox2/react-tagcloud/blob/master/examples/simple-cloud.js)
* [Custom props](https://github.com/madox2/react-tagcloud/blob/master/examples/custom-props.js)
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
