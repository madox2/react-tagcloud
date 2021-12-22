import React from 'react'

import { create, act } from 'react-test-renderer'

import { TagCloud } from '../src/TagCloud'
import { expectToMatchSnapshot, render } from './utils'

describe('TagCloud', () => {
  const data = [
    { value: 'tag1', count: 25 },
    { value: 'tag2', count: 15 },
    { value: 'tag3', count: 20 },
    { value: 'tag4', count: 3 },
  ]

  it('should render simple cloud', () => {
    let cloud
    act(() => {
      cloud = create(<TagCloud minSize={12} maxSize={30} tags={data} />)
    })
    const tags = cloud.root.findAllByProps({ className: 'tag-cloud-tag' })
    expect(tags.length).toBe(data.length)
  })

  it('should render tags with default renderer', () => {
    expectToMatchSnapshot(
      <TagCloud minSize={12} maxSize={30} tags={data} randomSeed={42} />,
    )
  })

  it('should render not shuffled tags', () => {
    expectToMatchSnapshot(
      <TagCloud
        shuffle={false}
        minSize={12}
        maxSize={30}
        tags={data}
        randomSeed={42}
      />,
    )
  })

  it('should use custom renderer', () => {
    const customRenderer = (tag, size) => {
      return (
        <a
          href="#"
          key={tag.value}
          className={`tag-${size}`}
        >{`${tag.value}-${tag.count}`}</a>
      )
    }
    expectToMatchSnapshot(
      <TagCloud
        minSize={12}
        maxSize={30}
        tags={data}
        renderer={customRenderer}
        shuffle={false}
      />,
    )
  })

  it('should trigger onClick event', () => {
    const onClickSpy = jest.fn()
    let cloud
    act(() => {
      cloud = create(
        <TagCloud
          minSize={12}
          maxSize={30}
          shuffle={false}
          tags={data}
          onClick={onClickSpy}
        />,
      )
    })
    const tag3 = cloud.root.findAllByProps({ className: 'tag-cloud-tag' })[2]
    expect(tag3).not.toBeUndefined()
    const clickEvent = new Event('click')
    tag3.props.onClick(clickEvent)
    expect(onClickSpy).toHaveBeenCalled()
    expect(onClickSpy).toHaveBeenCalledWith(
      {
        value: 'tag3',
        count: 20,
      },
      clickEvent,
    )
  })

  it('should not re-shuffle tags', () => {
    const rng = jest.fn(() => 0.5)
    let cloud
    act(() => {
      cloud = create(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).toHaveBeenCalled()
    rng.mockClear()
    act(() => {
      cloud.update(
        <TagCloud
          minSize={10}
          maxSize={30}
          tags={data.slice()}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).not.toHaveBeenCalled()
    rng.mockClear()
  })

  it('should re-shuffle tags when tags changes', () => {
    const rng = jest.fn(() => 0.5)
    let cloud
    act(() => {
      cloud = create(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    act(() => {
      cloud.update(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data.slice().concat([{ value: 'tag5', count: 3 }])}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    act(() => {
      cloud.update(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    act(() => {
      cloud.update(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data.slice().reverse()}
          randomNumberGenerator={rng}
        />,
      )
    })
    expect(rng).toHaveBeenCalled()
    rng.mockClear()
  })

  it('should shuffle with seed', () => {
    const renderer = (tag, size, color) => (
      <span key={tag.value} className="tag-cloud-tag">
        {`${tag.value}:${color}`}
      </span>
    )
    let cloud
    act(() => {
      cloud = create(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomSeed={42}
          renderer={renderer}
        />,
      )
    })

    const tagsSeed42 = cloud.root
      .findAllByProps({ className: 'tag-cloud-tag' })
      .map((i) => i.props.children)

    act(() => {
      cloud.update(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomSeed={43}
          renderer={renderer}
        />,
      )
    })

    const tagsSeed43 = cloud.root
      .findAllByProps({ className: 'tag-cloud-tag' })
      .map((i) => i.props.children)

    expect(tagsSeed42).not.toEqual(tagsSeed43)

    act(() => {
      cloud.update(
        <TagCloud
          minSize={12}
          maxSize={30}
          tags={data}
          randomSeed={42}
          renderer={renderer}
        />,
      )
    })

    const tagsSeed42updated = cloud.root
      .findAllByProps({ className: 'tag-cloud-tag' })
      .map((i) => i.props.children)

    expect(tagsSeed42).toEqual(tagsSeed42updated)
  })

  it('should use custom rng', () => {
    const rng = jest.fn(() => 0.5)
    render(
      <TagCloud
        minSize={12}
        maxSize={30}
        tags={data}
        shuffle={true}
        randomNumberGenerator={rng}
      />,
    )
    expect(rng).toHaveBeenCalled()
  })
})
