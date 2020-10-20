import React from 'react'
import {Link} from 'react-router-dom'

function ChangeUserInfo() {

  return (
    <>
      <Link to="/update-info">Change User Information</Link>
      <Link to="/create-room">Create Room</Link>
      <Link to="/join-room">Join Room</Link>
      <Link to="/logout">Logout</Link>
    </>
  )
}

export default ChangeUserInfo;