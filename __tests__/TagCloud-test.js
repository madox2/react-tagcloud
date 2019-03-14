jest.unmock('../src/TagCloud');
jest.unmock('../src/defaultRenderer');
jest.unmock('../src/helpers');

jest.mock('shuffle-array', () => (arr, opts = {}) => {
  opts.rng && opts.rng();
  return arr.slice().reverse();
});

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
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
    tags.forEach((t, i) => expect(t.textContent).toEqual(reversed[i].value));
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
    const customRenderer = (tag, size) => {
      return <a href='#' key={tag.value} className={`tag-${size}`}>{`${tag.value}-${tag.count}`}</a>;
    };
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} renderer={customRenderer} shuffle={false} />
    );
    const tags = TestUtils.scryRenderedDOMComponentsWithTag(cloud, 'a');
    expect(tags.length).toEqual(4);
    tags.forEach((t, i) => expect(t.textContent).toEqual(`${data[i].value}-${data[i].count}`));
  });

  it('should not re-shuffle tags', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} />
    );
    const reversed = data.slice().reverse();
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(reversed[i]));
    cloud.componentWillReceiveProps({ shuffle: true, tags: data });
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(reversed[i]));
  });

  it('should re-shuffle tags when data changed', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} />
    );
    const reversed = data.slice().reverse();
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(reversed[i]));
    const newTag = { value: 'tag5', count: 55 };
    cloud.componentWillReceiveProps({ shuffle: true, tags: [...data, newTag] });
    const newShuffled = [...data, newTag].reverse();
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(newShuffled[i]));
  });

  it('should shuffle on the fly', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} shuffle={false} />
    );
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(data[i]));
    const reversed = data.slice().reverse();
    cloud.componentWillReceiveProps({ shuffle: true, tags: data });
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(reversed[i]));
  });

  it('should unshuffle on the fly', () => {
    const cloud = TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} shuffle={true} />
    );
    const reversed = data.slice().reverse();
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(reversed[i]));
    cloud.componentWillReceiveProps({ shuffle: false, tags: data });
    cloud._data.forEach((t, i) => expect(t.tag).toEqual(data[i]));
  });

  it('should use custom rng', () => {
    const rng = jest.fn();
    TestUtils.renderIntoDocument(
      <TagCloud minSize={12} maxSize={30} tags={data} shuffle={true} randomNumberGenerator={rng} />
    );

    expect(rng).toHaveBeenCalled();
  });
});
