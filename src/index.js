import { defaultRenderer } from './defaultRenderer';

const deprecatedRendererExport = (...args) => {
  // eslint-disable-next-line no-console
  console.warn(`Using deprecated 'DefaultRenderer' import, it will be removed in the next major release and replaced with 'defaultRenderer'.`);
  return defaultRenderer(...args);
};

export { TagCloud } from './TagCloud';
export { deprecatedRendererExport as DefaultRenderer };
export { defaultRenderer };

