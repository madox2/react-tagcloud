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
 * Computes appropriate font size of tag.
 */
export const fontSizeConverter = (count, min, max, minSize, maxSize) => {
  return Math.round((count - min) * (maxSize - minSize) / (max - min) + minSize);
};
