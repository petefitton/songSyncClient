import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

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
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={username} onChange={handleUsername}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={handlePassword}/>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword}/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={email} onChange={handleEmail}/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;