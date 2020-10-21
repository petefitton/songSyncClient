import React from 'react'
import LinkStyled from './LinkStyled'

const Room = (props) => {
  return (
    <LinkStyled path="/room" text={props.roomInfo.name} state={{roomInfo: props.roomInfo}} btncolor="#0808e5" />
  )
}

export default Room;