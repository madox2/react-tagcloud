import React from 'react'

import { View, StyleSheet } from 'react-native'
import { TagCloud as BaseTagCloud } from '../src'
import { defaultRenderer } from './defaultRenderer'

export function TagCloud(props) {
  return (
    <BaseTagCloud
      containerComponent={View}
      renderer={defaultRenderer}
      {...props}
      style={[styles.container, props.style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
