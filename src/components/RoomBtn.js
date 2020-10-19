import React from 'react'
import {Link} from 'react-router-dom'

const Room = (props) => {
  return (
    <div>
      <Link to={{pathname: "/room", state: {roomInfo: props.roomInfo} }}>{props.roomInfo.name}</Link>
    </div>
  )
}

export default Room;