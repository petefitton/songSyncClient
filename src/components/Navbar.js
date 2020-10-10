import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <div>
          <ul>
            <li>
              <NavLink exact to="/">Home</NavLink>
            </li>
          </ul>
          {props.isAuth 
            ? <ul>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <span onClick={props.handleLogout}>Logout</span>
              </li>
            </ul>
            : <ul>
              <li>
                <NavLink to="/signup">Create Account</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;