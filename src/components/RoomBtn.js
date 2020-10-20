import React from 'react'
import LinkStyled from './LinkStyled'

const Room = (props) => {
  return (
    <LinkStyled path="/room" text={props.roomInfo.name} state={{roomInfo: props.roomInfo}} btncolor="blue" />
  )
}

export default Room;