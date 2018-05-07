import React from 'react'
import renderer from 'react-test-renderer'

import ValidIcon from './ValidIcon'

jest.mock('material-ui/Tooltip', () => 'Tooltip')
jest.mock('material-ui-icons/Check', () => 'Check')
jest.mock('material-ui-icons/Clear', () => 'Clear')

describe('screens/Match/ValidIcon', () => {
  it('renders correctly when valid', () => {
    const tree = renderer.create(<ValidIcon valid />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when invalid', () => {
    const tree = renderer.create(<ValidIcon valid={false} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
