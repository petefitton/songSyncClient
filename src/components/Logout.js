import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import CancelBtn from './CancelBtn'

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
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h2>Are you sure?</h2>
        <button
          onClick={handleSubmit}
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
          }}
        >Logout</button>
        <CancelBtn />
      </div>
    </>
  )
}

export default Logout;