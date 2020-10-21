import axios from 'axios'
import React, {useState, useEffect} from 'react'
import LinkStyled from './LinkStyled'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient(process.env.REACT_APP_SERVER_URL)

const Room = (props) => {
  let [msgs, setMsgs] = useState([])
  let [textarea, setTextarea] = useState('')
  let [subBtnText, setSubBtnText] = useState('')

  useEffect(() => {
    // get initial chatroom messages
    let verificationData = {user: props.user, room: props.location.state.roomInfo}
    axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/msgInit', verificationData)
    .then(response => {
      setMsgs(response.data)
    })
  }, [props.user, props.location.state.roomInfo])

  useEffect(() => {
    socket.on('RECEIVE_MESSAGE', data => {
      setMsgs(msgs => msgs.concat([data]))
      setTextarea('')
      document.getElementById('chatEntry').value = ''
    })
  }, [])

  let handleTextarea = (e) => {
    setTextarea(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    if (textarea !== '') {
      socket.emit('SEND_MESSAGE', {
        roomId: props.location.state.roomInfo.id,
        userId: props.user.id,
        content: textarea
      })
    }
  }
  
  useEffect(() => {
    let chatArea = document.getElementById('chatArea')
    chatArea.scrollTop = chatArea.scrollHeight
  }, [msgs])

  useEffect(() => {
    axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/is-subscribed', {
      roomId: props.location.state.roomInfo.id,
      userId: props.user.id
    }).then(response => {
      if (response.data) {
        setSubBtnText('Unsubscribe')
      } else {
        setSubBtnText('Subscribe')
      }
    })
  }, [props.user.id, props.location.state.roomInfo.id])

  let handleSubBtn = (e) => {
    if (e.target.innerText === 'Unsubscribe') {
      axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/unsubscribe', {
        roomId: props.location.state.roomInfo.id,
        userId: props.user.id
      })
      .catch(err=>console.log(err))
      setSubBtnText('Subscribe')
    } else {
      axios.post(process.env.REACT_APP_SERVER_URL+'/rooms/subscribe', {
        roomId: props.location.state.roomInfo.id,
        userId: props.user.id
      })
      .then(response => {
        if (response) {
          setSubBtnText('Unsubscribe')
        }
      })
      .catch(err=>console.log(err))
    }
  }

  let enterHandler = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <div>
      <h1>{props.location.state.roomInfo.name}</h1>
      <div style={{display: "flex", justifyContent: "space-evenly"}}>
        <LinkStyled path="/profile" btncolor="red" text="Leave Room" width="40%"></LinkStyled>
        <button
          onClick={handleSubBtn}
          style={{
            backgroundColor: "blue",
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            textDecoration: "none",
            width: "45%",
            textAlign: "center",
            margin: "6px",
            overflowWrap: "break-word",
            border: "none",
            fontSize: "16px",
          }}
        >
          {subBtnText}
        </button>
      </div>
      <div id="chatArea" style={{height: "50vh", overflowX: "hidden", overflowY: "auto", maxWidth: "300px", margin: "15px auto", padding: "5px", border: "2px solid black", whiteSpace: "pre-wrap"}}>
        {msgs.length > 0 ? msgs.map((msg, idx) => {
          return <p key={idx} style={{overflowWrap: "break-word"}}><strong>{msg.user.username}</strong><br></br>{msg.content}</p>
        }): <></>}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea id="chatEntry" onChange={handleTextarea} onKeyDown={enterHandler} value={textarea}></textarea>
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
        >Send</button>
      </form>
    </div>
  )
}

export default Room;