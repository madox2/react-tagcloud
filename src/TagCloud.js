import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import arrayShuffle from 'shuffle-array'
import randomColor from 'randomcolor'

import { defaultRenderer } from './defaultRenderer'
import { fontSizeConverter, keys, omit, pick } from './helpers'

const handlersPropNames = ['onClick', 'onDoubleClick', 'onMouseMove']
const cloudPropNames = [
  'tags',
  'shuffle',
  'renderer',
  'maxSize',
  'minSize',
  'colorOptions',
  'disableRandomColor',
  'randomNumberGenerator',
]
function generateColor(tag, { disableRandomColor, colorOptions }) {
  if (tag.color) {
    return tag.color
  }
  if (disableRandomColor) {
    return undefined
  }
  return randomColor(colorOptions)
}

function withTagCloudHandlers(elem, tag, cloudHandlers) {
  const origHandlers = pick(elem.props, handlersPropNames)
  const props = keys(cloudHandlers).reduce((acc, handlerName) => {
    acc[handlerName] = e => {
      cloudHandlers[handlerName] && cloudHandlers[handlerName](tag, e)
      origHandlers[handlerName] && origHandlers(e)
    }
    return acc
  }, {})
  return React.cloneElement(elem, props)
}

function renderTags(props, data) {
  const { minSize, maxSize } = props
  const counts = data.map(({ tag }) => tag.count),
    min = Math.min(...counts),
    max = Math.max(...counts)
  const cloudHandlers = pick(props, handlersPropNames)
  return data.map(({ tag, color }) => {
    const fontSize = fontSizeConverter(tag.count, min, max, minSize, maxSize)
    const elem = props.renderer(tag, fontSize, color)
    return withTagCloudHandlers(elem, tag, cloudHandlers)
  })
}

function randomize(props) {
  const { tags, shuffle, randomNumberGenerator } = props
  const data = tags.map(tag => ({
    tag,
    color: generateColor(tag, props),
  }))
  return shuffle ? arrayShuffle(data, { rng: randomNumberGenerator }) : data
}

export function TagCloud(props) {
  const [data, setData] = useState([])
  const tagsComparison = props.tags.map(t => t.key || t.value).join(':')
  // randomize (color, shuffle) when tags or certain props change
  useEffect(() => {
    setData(randomize(props))
  }, [
    props.colorOptions,
    props.shuffle,
    props.disableRandomColor,
    tagsComparison,
  ])
  const other = omit(props, [...cloudPropNames, ...handlersPropNames])
  return <div {...other}>{renderTags(props, data)}</div>
}

TagCloud.propTypes = {
  tags: PropTypes.array.isRequired,
  maxSize: PropTypes.number.isRequired,
  minSize: PropTypes.number.isRequired,
  shuffle: PropTypes.bool,
  colorOptions: PropTypes.object,
  disableRandomColor: PropTypes.bool,
  renderer: PropTypes.func,
  className: PropTypes.string,
  randomNumberGenerator: PropTypes.func,
}

TagCloud.defaultProps = {
  renderer: defaultRenderer,
  shuffle: true,
  className: 'tag-cloud',
  colorOptions: {},
}
