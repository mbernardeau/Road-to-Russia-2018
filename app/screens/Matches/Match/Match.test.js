import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'

import Match from './Match'

describe('screens/Match', () => {
  // Mock date to ensure consistancy between tests
  Date.now = jest.fn(() => 1482363367071)

  moment.locale('fr')

  // Mock toLocaleString because of inconsistant behaviour in node (it works correctly in browsers)
  // eslint-disable-next-line
  Number.prototype.toLocaleString = function() {
    return `${this}`
  }

  const props = {
    match: {
      dateTime: 1530205200,
      odds: {
        1: 1.7,
        2: 4.3,
        A: 3.2,
        B: 0,
        N: 3.2,
      },
      phase: '0',
    },
    teamB: {
      code: 'br',
      group: 'G',
      name: 'Brésil',
    },
    teamA: {
      code: 'cl',
      group: 'G',
      name: 'Chili',
    },
    stadium: {
      capacity: 35000,
      city: 'Kaliningrad',
      name: 'Stade de Kaliningrad',
      photo: {
        credit:
          'By A.Savin (Wikimedia Commons · WikiPhotoSpace) (Own work) [FAL], via Wikimedia Commons',
        url:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kaliningrad_05-2017_img72_new_stadium.jpg/512px-Kaliningrad_05-2017_img72_new_stadium.jpg',
      },
    },
    matchId: '-Kj2zgKPFE3FgypNGQ-1',
    userId: 'yWobdSGHFqTYO5yU0s46QYeplen2',
    firebase: {
      ref: {},
      storage: {},
      database: {},
      auth: {},
      set: {},
      setWithMeta: {},
      uniqueSet: {},
      push: {},
      pushWithMeta: {},
      remove: {},
      update: {},
      updateWithMeta: {},
      login: {},
      logout: {},
      updateAuth: {},
      updateEmail: {},
      updateProfile: {},
      uploadFile: {},
      uploadFiles: {},
      deleteFile: {},
      createUser: {},
      resetPassword: {},
      confirmPasswordReset: {},
      verifyPasswordResetCode: {},
      watchEvent: {},
      unWatchEvent: {},
    },
    bet: {
      lastModified: '2017-09-12T18:58:56.825Z',
      teamA: 3,
      teamB: 1,
    },
    saveBet: jest.fn(),
  }

  it('renders correctly', () => {
    const tree = renderer.create(<Match {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
