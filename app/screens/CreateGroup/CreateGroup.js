import React from 'react'

import JoinGroup from './JoinGroup'

const CreateGroup = () => (
  <div style={styles.container}>
    <JoinGroup />
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

export default CreateGroup
