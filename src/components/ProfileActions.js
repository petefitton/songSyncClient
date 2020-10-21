import React from 'react'
import LinkStyled from './LinkStyled'

function ProfileActions() {

  return (
    <div className="profActionsDiv" style={{position: "absolute", width: "100%", padding: "10px 0px 20px", borderTop: "2px solid black"}}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <LinkStyled path="/create-room" text="Create Room" btncolor="#e98b00" />
        <LinkStyled path="/join-room" text="Join Room" btncolor="#00af46" />
        <LinkStyled path="/view-public-rooms" text="View Public Rooms" btncolor="#00af46" />
        <LinkStyled path="/update-info" text="Change User Information" btncolor="#00af46" />
        <LinkStyled path="/logout" text="Logout" btncolor="#d80c0c" />
      </div>
    </div>
  )
}

export default ProfileActions;