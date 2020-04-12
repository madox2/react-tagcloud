/**
 * Computes appropriate font size of tag.
 */
export const fontSizeConverter = (count, min, max, minSize, maxSize) => {
  if (max - min === 0) {
    // handle devision by zero
    return Math.round((minSize + maxSize) / 2)
  }
  return Math.round(
    ((count - min) * (maxSize - minSize)) / (max - min) + minSize,
  )
}

/**
 * Creates an object composed of not omitted object properties.
 */
export const omit = (obj, keys) => {
  return Object.keys(obj).reduce((r, key) => {
    if (!~keys.indexOf(key)) {
      r[key] = obj[key]
    }
    return r
  }, {})
}

/**
 * Creates an object composed of the picked object properties.
 */
export function pick(obj, keys) {
  return keys.reduce((picked, key) => {
    picked[key] = obj[key]
    return picked
  }, {})
}

/**
 * Returns an array of object keys.
 */
export function keys(obj) {
  return Object.keys(obj)
}
