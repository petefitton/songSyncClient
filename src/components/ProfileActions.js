import React from 'react'
import {Link} from 'react-router-dom'
import LinkStyled from './LinkStyled'

function ProfileActions() {

  return (
    <div style={{position: "absolute", bottom: "0px", width: "100%", padding: "10px 0px 20px", borderTop: "2px solid black"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <LinkStyled path="/update-info" text="Change User Information" btnColor="aqua" />
        <LinkStyled path="/create-room" text="Create Room" btnColor="yellow" />
        <LinkStyled path="/join-room" text="Join Room" btnColor="aqua" />
        <LinkStyled path="/logout" text="Logout" btnColor="red" />
      </div>
    </div>
  )
}

export default ProfileActions;