jest.unmock('../src/defaultRenderer');
jest.unmock('../src/helpers');

jest.mock('randomcolor', () => o => Object.keys(o).length ? 'custom' : 'red');

import TestUtils from 'react-dom/test-utils';
import { defaultRenderer } from '../src/defaultRenderer';

const { any, objectContaining } = jasmine;

describe('defaultRenderer', () => {

  it('should render tag', () => {
    const tag = defaultRenderer({ value: 'tag1', key: 'key1', count: 33 }, 18, 'red');
    const tagDom = TestUtils.renderIntoDocument(tag);
    expect(tagDom.textContent).toEqual('tag1');
    expect(tag).toEqual(objectContaining({
      type: 'span',
      key: 'key1'
    }));
    expect(tag.props).toEqual(objectContaining({
      className: 'tag-cloud-tag',
      style: any(Object)
    }));
    expect(tag.props.style).toEqual(objectContaining({
      color: 'red',
      fontSize: '18px'
    }));
  });

});
