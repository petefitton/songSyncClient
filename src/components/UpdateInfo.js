import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import CancelBtn from './CancelBtn'

function UpdateInfo(props) {
  let [initInfo, setInitInfo] = useState({})
  let [password, setPassword] = useState('')
  let [passwordConfirm, setPasswordConfirm] = useState('')
  let [email, setEmail] = useState('')
  let [redirect, setRedirect] = useState(false)
  let [err, setErr] = useState(<></>)

  useEffect(() => {
    if (props.user) {
      axios.post(process.env.REACT_APP_SERVER_URL+'/users/userInfo', {user: props.user})
      .then(response => {
        if (response.data) {
          setInitInfo(response.data)
        }
      })
    }
  }, [props.user])

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  let handleEmail = (e) => {
    setEmail(e.target.value)
  }

  let handlePasswordSub = (e) => {
    e.preventDefault()

    if (password === passwordConfirm) {
      axios.post(process.env.REACT_APP_SERVER_URL+'/users/update-password', {password: password, user: props.user})
      .then(response => {
        if (response.data) {
          setRedirect(true)
        } else {
          setErr(<p>An error occurred</p>)
        }
      })
      .catch(err => console.log(err))
    } else {
      setErr(<p>Passwords do not match</p>)
    }
  }

  let handleEmailSub = (e) => {
    e.preventDefault()

    axios.post(process.env.REACT_APP_SERVER_URL+'/users/update-email', {email: email, user: props.user})
    .then(response => {
      if (response.data) {
        setRedirect(true)
      } else {
        setErr(<p>An error occurred</p>)
      }
    })
    .catch(err => console.log(err))
  }

  if (redirect) return <Redirect to="/profile" user={props.user} />

  return (
    <>
      <h1>Update Info</h1>
      <h3 style={{textAlign: "center"}}>
        {initInfo ? initInfo.username : ""}
      </h3>
      <p style={{textAlign: "center"}}>
        {initInfo ? initInfo.email : ""}
      </p>
      <form onSubmit={handlePasswordSub}>
        <input type="password" placeholder="Change Password" onChange={handlePassword}></input>
        <input type="password" placeholder="Confirm Password" onChange={handlePasswordConfirm}></input>
        <button type="submit">Update Password</button>
      </form>
      <form onSubmit={handleEmailSub}>
        <input placeholder="Change Email" onChange={handleEmail}></input>
        <button type="submit">Update Email</button>
      </form>
      {err}
      <div style={{display: "flex", justifyContent: "center"}}>
        <CancelBtn />
      </div>
    </>
  )
}

export default UpdateInfo;