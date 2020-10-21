import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import CancelBtn from './CancelBtn'
import JoinBtn from './JoinBtn'
import bcrypt from 'bcryptjs'
import axios from 'axios'

function JoinRoomPassword(props) {
  let [password, setPassword] = useState('')
  let [redirect, setRedirect] = useState(false)
  let [err, setErr] = useState(<></>)

  if (props.location.state.roomInfo.password === '' || redirect) {
    axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/subscribe', {
      roomId: props.location.state.roomInfo.id,
      userId: props.user.id
    })
    .then(response => {
      if (response) {
        return <Redirect to={{pathname: "/room", state: {roomInfo: props.location.state.roomInfo} }} />
      }
    })
    .catch(err => console.log(err))
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    bcrypt.compare(password, props.location.state.roomInfo.password)
    .then(isMatch => {
      if (isMatch) {
        setRedirect(true)
      } else {
        setErr(<p>Wrong Password</p>)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Join {props.location.state.roomInfo.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="password" name="password" value={password} onChange={handlePassword} placeholder="Room Password" />
        </div>
        <JoinBtn />
      </form>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <CancelBtn />
      </div>
      {err}
    </>
  )
}

export default JoinRoomPassword;