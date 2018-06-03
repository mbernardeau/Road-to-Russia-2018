import React from 'react'
import renderer from 'react-test-renderer'

import Bet from './Bet'

jest.mock('@material-ui/core/Select', () => 'Select')
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem')
jest.mock('components/Flag', () => 'Flag')

describe('screens/Match/Bet', () => {
  const props = {
    team: {
      code: 'ru',
      name: 'Russie',
    },
    betValue: 1,
    onBetValueUpdated: jest.fn(),
  }

  it('renders correctly', () => {
    const tree = renderer.create(<Bet {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
