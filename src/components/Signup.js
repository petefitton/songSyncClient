import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import SignupBtn from './SignupBtn'
import LoginBtn from './LoginBtn'

const Signup = () => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')
  let [email, setEmail] = useState('')
  let [redirect, setRedirect] = useState(false)

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === confirmPassword) {
      const newUser = { username, email, password }

      axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, newUser)
      .then(response => {
        setRedirect(true)
      })
      .catch(err => console.log(err))
    }
  }

  if (redirect) return <Redirect to="/login" />

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
              <input type="text" name="username" value={username} onChange={handleUsername} placeholder="Username" />
            </div>
            <div>
              <input type="password" name="password" value={password} onChange={handlePassword} placeholder="Password" />
            </div>
            <div>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} placeholder="Confirm Password" />
            </div>
            <div>
              <input type="email" name="email" value={email} onChange={handleEmail} placeholder="Email" />
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
            >Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;