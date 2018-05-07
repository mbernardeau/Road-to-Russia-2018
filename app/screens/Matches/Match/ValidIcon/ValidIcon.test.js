import React from 'react'
import renderer from 'react-test-renderer'

import ValidIcon from './ValidIcon'

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
