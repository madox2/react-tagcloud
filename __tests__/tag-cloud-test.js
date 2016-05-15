jest.unmock('../src/TagCloud');
jest.unmock('../src/defaultRenderer');
jest.unmock('array-shuffle');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { TagCloud } from '../src/TagCloud';

// TODO: custom renderer, shuffle, events, font size

describe('TagCloud', () => {

  const data = [
    { value: 'tag1', count: 25 },
    { value: 'tag2', count: 15 },
    { value: 'tag3', count: 20 },
    { value: 'tag4', count: 3 },
  ];

  it('should render tags with default classes', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} />
    );
    const cloudNode = ReactDOM.findDOMNode(cloud);
    expect(TestUtils.isDOMComponent(cloudNode)).toBe(true);
    expect(cloudNode.className).toEqual('tag-cloud');
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    expect(tags.length).toEqual(4);
  });

  it('should render not shuffled tags', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} shuffle={false} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    expect(tags.length).toEqual(4);
    tags.forEach((t, i) => expect(t.textContent).toEqual(data[i].value))
  });

});
