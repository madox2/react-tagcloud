import { defaultRenderer } from '../src/defaultRenderer'
import { expectToMatchSnapshot } from './utils'

describe('defaultRenderer', () => {
  it('should render tag', () => {
    const tag = defaultRenderer(
      { value: 'tag1', key: 'key1', count: 33 },
      18,
      'red',
    )
    expectToMatchSnapshot(tag)
  })
})
