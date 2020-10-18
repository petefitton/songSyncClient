import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import JoinBtn from './JoinBtn'
import CancelBtn from './CancelBtn'

function JoinRoom() {
  let [roomname, setRoomname] = useState('')
  let [roomInfo, setRoomInfo] = useState('')
  let [redirect, setRedirect] = useState(false)
  let [err, setErr] = useState(<></>)

  let handleRoomname = (e) => {
    setRoomname(e.target.value)
  }

  let formSubmit = (e) => {
    e.preventDefault()
    console.log(roomname);

    // axios call to find out if room exists
    axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/find', {roomname})
    .then(room => {
      if (room.data !== '') {
        // console.log('room:');
        // console.log(room);
        setRoomInfo(room.data)
        setRedirect(true)
      } else {
        setErr(<p>Room does not exist</p>)
      }
    })
    .catch(err => console.log(err))
  }

  if (redirect) return <Redirect to={{pathname: "/join-room-password", state: {roomInfo} }} />

  return (
    <>
      <h1>Join</h1>
      <form onSubmit={formSubmit}>
        <input placeholder="Room Name" onChange={handleRoomname}></input>
        <button type="submit">Join</button>
      </form>
      <CancelBtn />
      {err}
    </>
  )
}

export default JoinRoom;