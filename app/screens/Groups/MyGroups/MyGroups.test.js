import React from 'react'
import renderer from 'react-test-renderer'

import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import MyGroups from './MyGroups'

jest.mock('material-ui/Card', () => 'Card')
jest.mock('material-ui/Table', () => 'Table')
jest.mock('material-ui/Table/TableBody', () => 'TableBody')
jest.mock('material-ui/Typography', () => 'Typography')
jest.mock('./GroupRow', () => 'GroupRow')

describe('Groups/MyGroups', () => {
  const state = {
    firebase: {
      auth: {
        uid: 'iduser',
      },
    },
  }

  const store = configureMockStore()(state)

  it('renders correctly when no group joined', () => {
    const props = {
      groups: {},
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <MyGroups {...props} />
        </Provider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with different groups', () => {
    const props = {
      groups: {
        idGroup: {
          name: 'my-test-group',
          members: {
            iduser: 'member',
          },
        },
        idGroup2: {
          name: 'my-test-group-2',
          members: {
            iduser: 'awaiting',
          },
        },
        idGroup3: {
          name: 'my-test-group-3',
          members: {
            iduser: 'admin',
          },
        },
      },
    }

    const tree = renderer
      .create(
        <Provider store={store}>
          <MyGroups {...props} />
        </Provider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
