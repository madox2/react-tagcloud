jest.unmock('../src/TagCloud');
jest.unmock('../src/defaultRenderer');
jest.unmock('../src/helpers');

jest.mock('array-shuffle', () => arr => arr.reverse());

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { TagCloud } from '../src/TagCloud';

const { createSpy, any } = jasmine;

describe('TagCloud', () => {

  const data = [
    { value: 'tag1', count: 25 },
    { value: 'tag2', count: 15 },
    { value: 'tag3', count: 20 },
    { value: 'tag4', count: 3 }
  ];

  it('should render tags with default renderer', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} />
    );
    const cloudNode = ReactDOM.findDOMNode(cloud);
    expect(TestUtils.isDOMComponent(cloudNode)).toBe(true);
    expect(cloudNode.className).toEqual('tag-cloud');
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    expect(tags.length).toEqual(4);
  });

  it('should render shuffled tags', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    expect(tags.length).toEqual(4);
    const reversed = data.slice().reverse();
    tags.forEach((t, i) => expect(t.textContent).toEqual(reversed[i].value))
  });

  it('should render not shuffled tags', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} shuffle={false} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    expect(tags.length).toEqual(4);
    tags.forEach((t, i) => expect(t.textContent).toEqual(data[i].value));
  });

  it('should trigger onClick event', () => {
    const onClickSpy = createSpy();
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} onClick={onClickSpy} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithClass(cloud, 'tag-cloud-tag');
    const tag3 = tags.find(t => t.textContent === 'tag3');
    expect(tag3).not.toBeUndefined();
    TestUtils.Simulate.click(tag3);
    expect(onClickSpy).toHaveBeenCalled();
    expect(onClickSpy).toHaveBeenCalledWith({
      value: 'tag3',
      count: 20
    }, any(Object));
  });

  it('should use custom renderer', () => {
    const customRenderer = (tag, size, key) => {
      return <a href='#' key={key} className={`tag-${size}`}>{`${tag.value}-${tag.count}`}</a>;
    };
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} renderer={customRenderer} shuffle={false} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithTag(cloud, 'a');
    expect(tags.length).toEqual(4);
    tags.forEach((t, i) => expect(t.textContent).toEqual(`${data[i].value}-${data[i].count}`));
  });

});
