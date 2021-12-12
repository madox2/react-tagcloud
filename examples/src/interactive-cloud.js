import React, { useState } from 'react'
import { TagCloud } from 'react-tagcloud'

const defaultData = [
  { value: 'jQuery', count: 25 },
  { value: 'MongoDB', count: 18 },
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'CSS3', count: 20 },
  { value: 'Webpack', count: 22 },
  { value: 'Babel.js', count: 7 },
  { value: 'ECMAScript', count: 25 },
  { value: 'Jest', count: 15 },
  { value: 'Mocha', count: 17 },
  { value: 'React Native', count: 27 },
  { value: 'Angular.js', count: 30 },
  { value: 'TypeScript', count: 15 },
  { value: 'Flow', count: 30 },
  { value: 'NPM', count: 11 },
]

export default () => {
  const [minSize, setMinSize] = useState(12)
  const [maxSize, setMaxSize] = useState(35)
  const [data, setData] = useState(defaultData)
  const [randomColor, setRandomColor] = useState(true)
  const [shuffle, setShuffle] = useState(true)
  return (
    <div>
      <div className="controls">
        <div>
          <span>Min</span>
          <input
            type="number"
            min={0}
            value={minSize}
            onChange={(e) => setMinSize(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <span>Max</span>
          <input
            type="number"
            min={0}
            value={maxSize}
            onChange={(e) => setMaxSize(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <span>Shuffle</span>
          <input
            type="checkbox"
            checked={shuffle}
            onChange={() => setShuffle(!shuffle)}
          />
        </div>
        <div>
          <span>Color</span>
          <input
            type="checkbox"
            checked={randomColor}
            onChange={() => setRandomColor(!randomColor)}
          />
        </div>
        <div>
          <button onClick={() => setData(data.slice(0, -1))}>Pop</button>
        </div>
      </div>
      <TagCloud
        minSize={minSize}
        maxSize={maxSize}
        tags={data}
        shuffle={shuffle}
        disableRandomColor={!randomColor}
        className="simple-cloud"
        onClick={(tag) => {
          const value = prompt('Edit tag value', tag.value)
          if (value == null) {
            return
          }
          const newTag = { value, count: tag.count }
          const newData = data.map((t) => {
            if (t.value === tag.value) {
              return newTag
            }
            return t
          })
          setData(newData)
        }}
      />
    </div>
  )
}
