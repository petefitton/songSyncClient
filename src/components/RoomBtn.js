import React from 'react'
import {Link} from 'react-router-dom'
import LinkStyled from './LinkStyled'

const Room = (props) => {
  return (
    <LinkStyled path="/room" text={props.roomInfo.name} state={{roomInfo: props.roomInfo}} btnColor="blue" />
  )
}

export default Room;