import React from 'react'
import renderer from 'react-test-renderer'

import ConnectionModal from './ConnectionModal'

jest.mock('material-ui/Button', () => 'Button')
jest.mock('react-icons/lib/fa/google', () => 'FaGoogle')
jest.mock('react-icons/lib/fa/facebook', () => 'FaFacebook')
jest.mock('material-ui/Dialog', () => ({
  DialogContent: 'DialogContent',
  DialogTitle: 'DialogTitle',
}))

describe('screens/App/ConnectionModal', () => {
  const props = {
    firebase: {
      login: jest.fn(),
    },
  }

  it('renders correctly', () => {
    const tree = renderer.create(<ConnectionModal {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
