import React from 'react'

import JoinGroup from './JoinGroup'
import MyGroups from './MyGroups'

const Groups = () => (
  <div style={styles.container}>
    <JoinGroup />
    <MyGroups />
  </div>
)

const styles = {
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}

export default Groups
