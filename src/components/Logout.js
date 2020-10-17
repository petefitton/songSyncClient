import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

function Logout(props) {
  let [redirect, setRedirect] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    props.handleLogout()
    setRedirect(true)
  }

  if (redirect) return <Redirect to="/" />

  return (
    <>
      <button onClick={handleSubmit}>Logout</button>
    </>
  )
}

export default Logout;