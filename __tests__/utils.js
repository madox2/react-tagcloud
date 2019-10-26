import { act } from 'react-dom/test-utils'
import * as ReactDOM from 'react-dom'

export function render(elem) {
  let container = document.createElement('div')
  act(() => {
    ReactDOM.render(elem, container)
  })
  return container
}

export function expectToMatchSnapshot(elem) {
  const container = render(elem)
  expect(container).toMatchSnapshot()
}
