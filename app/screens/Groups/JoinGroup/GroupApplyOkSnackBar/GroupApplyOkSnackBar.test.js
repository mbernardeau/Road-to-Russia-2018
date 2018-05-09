import React from 'react'
import renderer from 'react-test-renderer'

import GroupApplyOkSnackbar from './GroupApplyOkSnackBar'

jest.mock('material-ui/Snackbar', () => 'Snackbar')
jest.mock('material-ui/IconButton', () => 'IconButton')
jest.mock('@material-ui/icons/Close', () => 'CloseIcon')

xdescribe('screens/JoinGroup/GroupApplyOkSnackbar', () => {
  it('renders correctly', () => {
    const props = {
      open: true,
      handleRequestClose: () => {},
    }

    const tree = renderer.create(<GroupApplyOkSnackbar {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
