import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Room from './Room'
import ProfileActions from './ProfileActions'

const Profile = (props) => {
  let [rooms, setRooms] = useState([''])

  const userData = props.user ? 
  (<div>
    <h1>Profile</h1>
    <h2>Your Rooms</h2>
    {rooms[0] != '' ? rooms.map((room, idx) => {
      return <Room roomname={room} key="idx" />
    }) : <></>}
  </div>)
  : <h4>Loading...</h4>

  const errorDiv = () => {
    return (
      <div>
        <h3>Please <Link to="/login">login</Link> to view this page</h3>
      </div>
    )
  }

  // axios call with useEffect to retrieve favorited rooms
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
      {props.user ? userData : errorDiv()}
      <ProfileActions />
    </div>
  )
}

export default Profile;