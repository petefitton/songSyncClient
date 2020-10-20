import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  background-color: ${props => props.btnColor};
  padding: 5px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  width: ${props => (props.width ? props.width : "210px")};
  text-align: center;
  margin: 6px;
  overflow-wrap: break-word;
`

function LinkStyled(props) {  

  return (
    <StyledLink
      to={{pathname: props.path, state: props.state}}
      btnColor={props.btnColor}
      width={props.width}
    >{props.text}</StyledLink>
  )
}

export default LinkStyled