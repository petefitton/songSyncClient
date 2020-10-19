import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import CancelBtn from './CancelBtn'
import JoinBtn from './JoinBtn'

function JoinRoomPassword(props) {
  let [password, setPassword] = useState('')
  let [redirect, setRedirect] = useState(false)
  let [err, setErr] = useState(<></>)

  if (props.location.state.roomInfo.password === '' || redirect) {
    return <Redirect to={{pathname: "/room", state: {roomInfo: props.location.state.roomInfo} }} />
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    if (password === props.location.state.roomInfo.password) {
      setRedirect(true)
    } else {
      setErr(<p>Wrong Password</p>)
    }
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
      <CancelBtn />
      {err}
    </>
  )
}

export default JoinRoomPassword;