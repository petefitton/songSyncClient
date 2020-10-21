import React, {useEffect, useState} from 'react'
import RoomBtn from './RoomBtn'
import axios from 'axios'
import CancelBtn from './CancelBtn'

function PublicRooms() {
  let [pubRooms, setPubRooms] = useState([])
  let [err, setErr] = useState(<></>)
  
  useEffect(()=>{
    axios.get(process.env.REACT_APP_SERVER_URL+'/rooms/public')
    .then(response => {
      if (response.data) {
        setPubRooms(response.data)
      } else {
        setErr(<p>Error</p>)
      }
    })
  }, [])

  return (
    <>
      {err}
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", maxHeight: "84vh"}}>
        {pubRooms.length ? pubRooms.map((room, idx) => {
          return <RoomBtn roomInfo={room} key={idx} />
        })
        : <></>}
      </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "10px", borderTop: "2px solid black"}}>
        <CancelBtn />
      </div>
    </>
  )
}

export default PublicRooms