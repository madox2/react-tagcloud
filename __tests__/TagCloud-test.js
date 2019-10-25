import React from 'react'

import { mount } from 'enzyme'

import { TagCloud } from '../src/TagCloud'
import { expectToMatchSnapshot, render } from './utils'

jest.mock('shuffle-array', () => (arr, opts = {}) => {
  opts.rng && opts.rng()
  return arr.slice().reverse()
})

jest.mock('randomcolor', () => (arr, opts = {}) => {
  return 'red'
})

const { createSpy, any } = jasmine

describe('TagCloud', () => {
  const data = [
    { value: 'tag1', count: 25 },
    { value: 'tag2', count: 15 },
    { value: 'tag3', count: 20 },
    { value: 'tag4', count: 3 },
  ]

  it('should render tags with default renderer', () => {
    expectToMatchSnapshot(<TagCloud minSize={12} maxSize={30} tags={data} />)
  })

  it('should render not shuffled tags', () => {
    expectToMatchSnapshot(
      <TagCloud shuffle={false} minSize={12} maxSize={30} tags={data} />
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
      />
    )
  })

  it('should trigger onClick event', () => {
    const onClickSpy = createSpy()
    const cloud = mount(
      <TagCloud
        minSize={12}
        maxSize={30}
        shuffle={false}
        tags={data}
        onClick={onClickSpy}
      />
    )
    const tag3 = cloud.find('.tag-cloud-tag').at(2)
    expect(tag3).not.toBeUndefined()
    tag3.simulate('click')
    expect(onClickSpy).toHaveBeenCalled()
    expect(onClickSpy).toHaveBeenCalledWith(
      {
        value: 'tag3',
        count: 20,
      },
      any(Object)
    )
  })

  it('should not re-shuffle tags', () => {
    const rng = jest.fn()
    const cloud = mount(
      <TagCloud
        minSize={12}
        maxSize={30}
        tags={data}
        randomNumberGenerator={rng}
      />
    )
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    cloud.setProps({ minSize: 10, tags: data.slice() })
    cloud.update()
    expect(rng).not.toHaveBeenCalled()
    rng.mockClear()
  })

  it('should re-shuffle tags when tags changes', () => {
    const rng = jest.fn()
    const cloud = mount(
      <TagCloud
        minSize={12}
        maxSize={30}
        tags={data}
        randomNumberGenerator={rng}
      />
    )
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    cloud.setProps({ tags: data.slice().concat([{ value: 'tag5', count: 3 }]) })
    cloud.update()
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    cloud.setProps({ tags: data })
    cloud.update()
    expect(rng).toHaveBeenCalled()
    rng.mockClear()

    cloud.setProps({ tags: data.slice().reverse() })
    cloud.update()
    expect(rng).toHaveBeenCalled()
    rng.mockClear()
  })

  it('should use custom rng', () => {
    const rng = jest.fn()
    render(
      <TagCloud
        minSize={12}
        maxSize={30}
        tags={data}
        shuffle={true}
        randomNumberGenerator={rng}
      />
    )
    expect(rng).toHaveBeenCalled()
  })
})
