import React from 'react'
import {Link} from 'react-router-dom'

const Profile = (props) => {
  const userData = props.user ? 
  (<div>
    <h1>Profile</h1>
    <p><strong>Username:</strong> {props.user.username}</p> 
  </div>)
  : <h4>Loading...</h4>

  const errorDiv = () => {
    return (
      <div>
        <h3>Please <Link to="/login">login</Link> to view this page</h3>
      </div>
    )
  }
  
  return (
    <div>
      {props.user ? userData : errorDiv()}
    </div>
  )
}

export default Profile;