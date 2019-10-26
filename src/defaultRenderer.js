import React from 'react'

export const defaultRenderer = (tag, size, color) => {
  const fontSize = size + 'px'
  const key = tag.key || tag.value
  const style = { ...styles, color, fontSize }
  return (
    <span className="tag-cloud-tag" style={style} key={key}>
      {tag.value}
    </span>
  )
}

const styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block',
}
