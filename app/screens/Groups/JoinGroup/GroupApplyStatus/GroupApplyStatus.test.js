import React from 'react'
import renderer from 'react-test-renderer'

import GroupApplyStatus from './GroupApplyStatus'

jest.mock('@material-ui/core/Snackbar', () => 'Snackbar')
jest.mock('@material-ui/core/IconButton', () => 'IconButton')
jest.mock('@material-ui/icons/Close', () => 'CloseIcon')

describe('screens/JoinGroup/GroupApplyOkSnackbar', () => {
  it('renders correctly without props', () => {
    const props = {
      handleClose: jest.fn(),
    }

    const tree = renderer.create(<GroupApplyStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when failed props', () => {
    const props = {
      handleClose: jest.fn(),
      status: 'failed',
      reason: "ma super tribu n'existe pas",
    }

    const tree = renderer.create(<GroupApplyStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly when success', () => {
    const props = {
      handleClose: jest.fn(),
      status: 'success',
      name: 'ma super tribu',
    }

    const tree = renderer.create(<GroupApplyStatus {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
