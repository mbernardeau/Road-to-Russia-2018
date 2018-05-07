import React from 'react'
import renderer from 'react-test-renderer'

import GroupApplyOkSnackbar from './GroupApplyOkSnackBar'

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
