import React, {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import CancelBtn from './CancelBtn'

function CreateRoom(props) {
  let [roomname, setRoomname] = useState('')
  let [roompassword, setRoompassword] = useState('')
  let [roomIsPub, setRoomIsPub] = useState(true)
  let [redirect, setRedirect] = useState(false)
  let [err, setErr] = useState(<></>)
  let [createdRoom, setCreatedRoom] = useState(undefined)

  let handleRoomname = (e) => {
    setRoomname(e.target.value)
  }

  let handleRoompassword = (e) => {
    setRoompassword(e.target.value)
  }

  let handleRoomIsPub = (e) => {
    setRoomIsPub(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    const roomData = {roomname, roomIsPub, roompassword, roomOwner: props.user.id}

    axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms/create`, roomData)
    .then(response => {
      setCreatedRoom(response.data)
    }).then(() => {
      setRedirect(true)
    })
    .catch(err => {
      setErr(<p style={{color:"red"}}>Room with that name already exists</p>)
      console.log(err)
    })
  }

  if (redirect && createdRoom) return <Redirect to={{pathname: "/join-room-password", state: {roomInfo: createdRoom} }} />

  return (
    <>
      <h1>Create Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="roomname" value={roomname} onChange={handleRoomname} placeholder="Room Name" />
        </div>
        <div>
          <input type="radio" id="public" name="pubPriv" value="true" onChange={handleRoomIsPub} checked />
          <label htmlFor="public">Public</label>
        </div>
        <div>
          <input type="radio" id="private" name="pubPriv" value="false" onChange={handleRoomIsPub} />
          <label htmlFor="private">Private</label>
        </div>
        <div>
          <input type="password" name="roompassword" value={roompassword} onChange={handleRoompassword} placeholder="Room Password" />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            textDecoration: "none",
            width: "220px",
            textAlign: "center",
            margin: "6px",
            overflowWrap: "break-word",
            border: "none",
            fontSize: "16px",
            marginTop: "20px"
          }}
        >Create</button>
        {err}
      </form>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <CancelBtn />
      </div>
    </>
  )
}

export default CreateRoom;