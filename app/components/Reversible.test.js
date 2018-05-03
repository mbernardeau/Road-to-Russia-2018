import React from 'react'
import renderer from 'react-test-renderer'

import Reversible from './Reversible'

describe('components/Flag', () => {
  it('renders correctly when no direction specified', () => {
    const tree = renderer
      .create(
        <Reversible>
          <div>1</div>
          <div>2</div>
        </Reversible>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with ltr', () => {
    const tree = renderer
      .create(
        <Reversible direction="ltr">
          <div>1</div>
          <div>2</div>
        </Reversible>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with rtl', () => {
    const tree = renderer
      .create(
        <Reversible direction="rtl">
          <div>1</div>
          <div>2</div>
        </Reversible>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('passes props to the underlying div', () => {
    const tree = renderer
      .create(
        <Reversible style={{ margin: 1 }}>
          <div>1</div>
          <div>2</div>
        </Reversible>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
