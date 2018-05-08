import React from 'react'

import JoinGroup from './JoinGroup'
import MyGroups from './MyGroups'

import './groups.scss'

const Groups = () => (
  <div className="groups-container">
    <JoinGroup />
    <MyGroups />
  </div>
)

export default Groups
