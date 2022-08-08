import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

function TagItem({ children, onPress, onPressIn, onPressOut, ...props }) {
  if (onPress || onPressIn || onPressOut) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Text {...props}>{children}</Text>
      </TouchableOpacity>
    )
  }
  return <Text {...props}>{children}</Text>
}

export const defaultRenderer = (tag, size, color) => {
  const { style, ...props } = tag.props || {}
  const fontSize = size
  const key = tag.key || tag.value
  const tagStyle = { ...styles, color, fontSize, ...style }

  return (
    <TagItem style={tagStyle} key={key} {...props}>
      {tag.value}
    </TagItem>
  )
}

const styles = {
  marginRight: 3,
  marginLeft: 3,
}
