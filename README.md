# react-tagcloud

![](https://github.com/madox2/react-tagcloud/workflows/Tests/badge.svg)

Simple and extensible tag/word cloud React component.

See the [demo](https://madox2.github.io/react-tagcloud/).

![preview tag-cloud preview](./demo-min.png)

## Installation

```
npm install react-tagcloud

# or with yarn
yarn add react-tagcloud

# react < 16.8.0
npm install react-tagcloud@1.4
```

## Basic usage

```javascript
import { TagCloud } from 'react-tagcloud'

const data = [
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'MongoDB', count: 18 },
  { value: 'CSS3', count: 20 },
]

const SimpleCloud = () => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
    onClick={tag => alert(`'${tag.value}' was selected!`)}
  />
)
```

### React Native

In react native projects import tag cloud from the package relative path `react-tagcloud/rn`.

```javascript
import React from 'react';

import { Alert } from 'react-native';
import { TagCloud } from 'react-tagcloud/rn'

const data = [
  // ...
]

const SimpleCloud = () => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
    onPress={tag => Alert.alert(`'${tag.value}' was selected!`)}
  />
)
```

## API

### Options

`<TagCloud />` component has props listed below:

| Option | Type | Required | Note |
|-----------|----------|--------|---|
|`tags`                 |`Array`   |`true`|Array of objects that represent tags (see [Tag object](#tag-object))|
|`maxSize`              |`Number`  |`true` |Maximal font size (in px) used in cloud|
|`minSize`              |`Number`  |`true` |Minimal font size (in px) used in cloud|
|`shuffle`              |`Boolean` |`false`|If true, tags are shuffled. When `tags` are modified, cloud is re-shuffled. Default: `true`|
|`colorOptions`         |`Object`  |`false`|Random color options (see [randomColor#options](https://github.com/davidmerfield/randomColor#options))|
|`disableRandomColor`   |`Boolean` |`false`|If `true`, random color is not used|
|`randomSeed`           |`Number`  |`false`|Random seed used to shuffle tags and generate color|
|`renderer`             |`Function`|`false`|Function used to render tag|
|`randomNumberGenerator`|`Function`|`false`|DEPRECATED, use `randomSeed` instead. Specifies a custom random number generator that is being used by shuffle algorithm. Default: `Math.random`|

*Note:* Furthermore you can pass any other prop and it will be forwarded to the wrapping `<div />` component (e.g. `style`, `className`).

### Tag object

Each tag is represented by object literal having following properties:

| Property | Type | Required | Note |
|----------|------|----------|------|
|`value`|`String`|`true` |String value to be displayed|
|`count`|`Number`|`true` |Represents frequency of the tag that is used to calculate tag size|
|`key`  |`String`|`false`|Tag element key. If it is not provided, `value` property will be used instead (however it can fail if you don't have unique tag values. It is highly recommeded to use `key` property)|
|`color`|`String`|`false`|Represents color of the tag. If it is not provided, random color will be used instead|
|`props`|`Object`|`false`|Props to be passed to a particular tag component|

### Events

Event handlers can be passed to the `<TagCloud />` props.
Each handler has two arguments: the first is related tag object and the second is DOM event object.

Currently supported events: `onClick`, `onDoubleClick`, `onMouseMove`

*Note:* Feel free to open issue if any other event is needed.

### Styles

Default class names are `tag-cloud` for the wrapping container, and `tag-cloud-tag` for a particular tag.
Styles passed to `<TagCloud />` props will be applied to the wrapping container.

### Renderer

Rendering of tags can be fully customized by providing custom render function and passing it to the `renderer` prop.
By default is used [defaultRenderer](https://github.com/madox2/react-tagcloud/blob/master/src/defaultRenderer.js).
Render function has three arguments - `tag`, `size` and `color`.
For example:

```javascript
import { TagCloud } from 'react-tagcloud'

const customRenderer = (tag, size, color) => {
  return (
    <span key={tag.value} style={{ color }} className={`tag-${size}`}>
      {tag.value}
    </span>
  )
}

const CustomizedCloud = () => (
  <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} />
)
```

## More examples

* [Simple tag cloud](https://github.com/madox2/react-tagcloud/blob/master/examples/src/simple-cloud.js)
* [Custom color options](https://github.com/madox2/react-tagcloud/blob/master/examples/src/custom-color-options.js)
* [Custom styles](https://github.com/madox2/react-tagcloud/blob/master/examples/src/custom-styles.js)
* [Custom tag props](https://github.com/madox2/react-tagcloud/blob/master/examples/src/tag-props.js)
* [Custom renderer](https://github.com/madox2/react-tagcloud/blob/master/examples/src/custom-renderer.js)

## Testing

Install dev modules:

```
yarn install
```

### Run unit tests

```
yarn test
```

### Run examples

```
cd examples
yarn install
yarn start
```

and open browser at `http://localhost:3000`

## License

[MIT License](https://github.com/madox2/react-tagcloud/blob/master/LICENSE)
