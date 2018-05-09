import React from 'react'
import renderer from 'react-test-renderer'

import GroupCreateStatus from './GroupCreateStatus'

jest.mock('material-ui/Snackbar', () => 'Snackbar')
jest.mock('material-ui/IconButton', () => 'IconButton')
jest.mock('@material-ui/icons/Close', () => 'CloseIcon')

describe('screens/CreateGroup/GroupCreateStatus', () => {
  it('renders correctly without props', () => {
    const props = {
      handleClose: jest.fn(),
    }

    const tree = renderer.create(<GroupCreateStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when failed props', () => {
    const props = {
      handleClose: jest.fn(),
      status: 'failed',
      reason: 'Nosé',
    }

    const tree = renderer.create(<GroupCreateStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when success', () => {
    const props = {
      handleClose: jest.fn(),
      status: 'success',
      group: {},
    }

    const tree = renderer.create(<GroupCreateStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
