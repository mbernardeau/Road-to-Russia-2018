import React from 'react'
import renderer from 'react-test-renderer'

import StadiumTooltip from './StadiumTooltip'

describe('screens/Match/StadiumTooltip', () => {
  const stadium = {
    capacity: 69500,
    city: 'Saint-Pétersbourg',
    name: 'Stade Krestovski',
  }

  const stadiumWithPhoto = {
    ...stadium,
    photo: {
      credit: 'Andrew Shiva / Wikipedia, via Wikimedia Commons',
      url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/RUS-2016-Aerial-SPB-Krestovsky_Stadium_02.jpg/512px-RUS-2016-Aerial-SPB-Krestovsky_Stadium_02.jpg',
    },
  }

  // Mock toLocaleString because of inconsistant behaviour in node (it works correctly in browsers)
  // eslint-disable-next-line
  Number.prototype.toLocaleString = function() {
    return `${this}`
  }

  it('renders correctly', () => {
    const tree = renderer.create(<StadiumTooltip {...stadiumWithPhoto} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('render with no image if not provided', () => {
    const tree = renderer.create(<StadiumTooltip {...stadium} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
