jest.unmock('../src/defaultRenderer');
jest.unmock('../src/helpers');

jest.mock('randomcolor', () => o => Object.keys(o).length ? 'custom' : 'red');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { defaultRenderer } from '../src/defaultRenderer';

const { any, objectContaining } = jasmine;

describe('defaultRenderer', () => {

  it('should render tag', () => {
    const render = defaultRenderer();
    const tag = render({ value: 'tag1', count: 33 }, 18, 1);
    const tagDom = TestUtils.renderIntoDocument(tag);
    expect(tagDom.textContent).toEqual('tag1');
    expect(tag).toEqual(objectContaining({
      type: 'span',
      key: '1'
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

  it('should use custom tag renderer', () => {
    const render = defaultRenderer({
      tagRenderer: tag => <a href='#'>{tag.value}</a>
    });
    const tag = render({ value: 'tag1', count: 33 }, 18, 1);
    const tagDom = TestUtils.renderIntoDocument(tag);
    expect(tagDom.textContent).toEqual('tag1');
    expect(tag.props.children).toEqual(objectContaining({ type: 'a' }));
  });

  it('should use custom color options', () => {
    const render = defaultRenderer({
      colorOptions: { luminosity: 'light' }
    });
    const tag = render({ value: 'tag1', count: 33 }, 18, 1);
    expect(tag.props.style).toEqual(objectContaining({ color: 'custom' }));
  });

  it('should disable random color using custom props', () => {
    // deprecated
    const render = defaultRenderer({
      props: { disableRandomColor: true }
    });
    const tag = render({ value: 'tag1', count: 33 }, 18, 1);
    expect(tag.props.style.color).not.toBeDefined();
  });

  it('should disable random color using options', () => {
    const render = defaultRenderer({
      disableRandomColor: true
    });
    const tag = render({ value: 'tag1', count: 33 }, 18, 1);
    expect(tag.props.style.color).not.toBeDefined();
  });

});
