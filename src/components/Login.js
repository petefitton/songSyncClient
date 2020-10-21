import React, {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import {Redirect} from 'react-router-dom'
import LoginBtn from './LoginBtn'
import SignupBtn from './SignupBtn'

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
          <h1>Song Sync</h1>
          <div className="signLogDiv">
            <SignupBtn />
            <LoginBtn />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input style={{margin: "5px"}} type="text" name="username" value={username} onChange={handleUsername} placeholder="Username" />
            </div>
            <div>
              <input style={{margin: "5px"}} type="password" name="password" value={password} onChange={handlePassword} placeholder="Password" />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#0808e5",
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
            >Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;