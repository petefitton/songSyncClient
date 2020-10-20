import React, {useEffect, useState} from 'react'
import RoomBtn from './RoomBtn'
import axios from 'axios'

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
      <div style={{display: "flex", flexDirection: "column"}}>
        {pubRooms.length ? pubRooms.map((room, idx) => {
          return <RoomBtn roomInfo={room} />
        })
        : <></>}
      </div>
    </>
  )
}

export default PublicRooms