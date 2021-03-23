import React from 'react'

export const defaultRenderer = (tag, size, color) => {
  const { className, style, ...props } = tag.props || {}
  const fontSize = size + 'px'
  const key = tag.key || tag.value
  const tagStyle = { ...styles, color, fontSize, ...style }

  let tagClassName = 'tag-cloud-tag'
  if (className) {
    tagClassName += ' ' + className
  }

  return (
    <span className={tagClassName} style={tagStyle} key={key} {...props}>
      {tag.value}
    </span>
  )
}

const styles = {
  margin: '0px 3px',
  verticalAlign: 'middle',
  display: 'inline-block',
}
