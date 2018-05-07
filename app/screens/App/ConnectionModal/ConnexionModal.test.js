import React from 'react'
import renderer from 'react-test-renderer'

import ConnectionModal from './ConnectionModal'

describe('screens/App/ConnectionModal', () => {
  const props = {
    firebase: {
      login: () => {},
    },
  }

  it('renders correctly', () => {
    const tree = renderer.create(<ConnectionModal {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
