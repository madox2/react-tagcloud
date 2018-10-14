/**
 * Creates new object from target excluding given properties.
 */
export const omitProps = (target, props) => {
  return Object.keys(target).reduce((r, key) => {
    if (!~props.indexOf(key)) {
      r[key] = target[key];
    }
    return r;
  }, {});
};

/**
 * Creates new object from target including all available properties.
 */
export const includeProps = (target, props) => {
  return Object.keys(target).reduce((r, key) => {
    if (~props.indexOf(key) && key in target) {
      r[key] = target[key];
    }
    return r;
  }, {});
};

/**
 * Computes appropriate font size of tag.
 */
export const fontSizeConverter = (count, min, max, minSize, maxSize) => {
  if (max - min === 0) {
    // handle devision by zero
    return Math.round((minSize + maxSize) / 2)
  }
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};

/**
 * Returns true if arrays contains the same elements.
 */
export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((o, i) => o === arr2[i]);
};

export const propertiesEqual = (o1, o2, properties) => {
  return properties.every(prop => o1[prop] === o2[prop]);
}
