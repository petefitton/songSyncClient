import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RoomBtn from './RoomBtn'
import ProfileActions from './ProfileActions'

const Profile = (props) => {
  let [rooms, setRooms] = useState([''])

  const userData = props.user ? 
  (<div>
    <h2>Your Rooms</h2>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      {rooms[0] !== '' ? rooms.map((room, idx) => {
        return <RoomBtn roomInfo={room} key={idx} />
      }) : <></>}
    </div>
  </div>)
  : <h4>Loading...</h4>

  const errorDiv = () => {
    return (
      <div>
        <h3>Please <Link to="/login">login</Link> to view this page</h3>
      </div>
    )
  }

  useEffect(() => {
    if (props.user) {
      axios.get(process.env.REACT_APP_SERVER_URL+'/users/profile/'+props.user.id)
      .then(userRooms => {
        setRooms(userRooms.data)
      })
    }
  }, [props.user])
  
  return (
    <div>
      <h1 style={{marginTop: "40px"}}>Profile</h1>
      {props.user ? userData : errorDiv()}
      <ProfileActions />
    </div>
  )
}

export default Profile;