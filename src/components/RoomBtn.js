import React from 'react'
import {Link} from 'react-router-dom'

const Room = (props) => {
  return (
    <div>
      <Link to={"/"+props.roomname}>{props.roomname}</Link>
    </div>
  )
}

export default Room;