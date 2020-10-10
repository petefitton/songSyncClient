import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {Redirect} from 'react-router-dom'

const Login = (props) => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleUsername = (e) => {
    setUsername(e.target.value)
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault()

    const userData = {username, password}

    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, userData)
    .then(response => {
      const { token } = response.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      props.nowCurrentUser(decoded)
    })
    .catch(err => console.log(err))
  }

  if (props.user) return <Redirect to="/profile" user={props.user} />

  return (
    <div>
      <div>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={username} onChange={handleUsername} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={handlePassword} required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;