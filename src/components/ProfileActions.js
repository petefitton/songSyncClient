import React from 'react'
import LinkStyled from './LinkStyled'

function ProfileActions() {

  return (
    <div style={{position: "absolute", bottom: "0px", width: "100%", padding: "10px 0px 20px", borderTop: "2px solid black"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <LinkStyled path="/create-room" text="Create Room" btncolor="yellow" />
        <LinkStyled path="/join-room" text="Join Room" btncolor="aqua" />
        <LinkStyled path="/view-public-rooms" text="View Public Rooms" btncolor="blue" />
        <LinkStyled path="/update-info" text="Change User Information" btncolor="aqua" />
        <LinkStyled path="/logout" text="Logout" btncolor="red" />
      </div>
    </div>
  )
}

export default ProfileActions;