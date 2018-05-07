import React from 'react'

import CreateGroupComp from './CreateGroupComp'

const CreateGroup = () => (
  <div style={styles.container}>
    <CreateGroupComp />
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
