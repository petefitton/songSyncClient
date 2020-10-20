import React, {useEffect, useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Logout from './components/Logout'
import UpdateInfo from './components/UpdateInfo'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import JoinRoomPassword from './components/JoinRoomPassword'
import PublicRooms from './components/PublicRooms'
import Room from './components/Room'
import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken')
  return <Route render={() => {return user ? <Component {...rest} /> : <Redirect to="/login" />}}/>
}

function App() {
  let [currentUser, setCurrentUser] = useState("")
  // let [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      // setIsAuthenticated(false)
    } else {
      token = jwtDecode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      // setIsAuthenticated(true)
    }
  }, [])

  const nowCurrentUser = (userData) => {
    setCurrentUser(userData)
    // setIsAuthenticated(true)
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
      // setIsAuthenticated(false)
    }
  }

  return (
    <div>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route 
            path="/login" 
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} user={currentUser}/>} 
          />
          <Route path="/logout" render={() => <Logout handleLogout={handleLogout} />} />
          <PrivateRoute path="/profile" component={Profile} user={currentUser} />
          <PrivateRoute path="/update-info" component={UpdateInfo} user={currentUser} />
          <PrivateRoute path="/create-room" component={CreateRoom} user={currentUser} />
          <PrivateRoute path="/join-room" component={JoinRoom} user={currentUser} />
          <PrivateRoute path="/join-room-password" component={JoinRoomPassword} user={currentUser} />
          <PrivateRoute path="/view-public-rooms" component={PublicRooms} user={currentUser} />
          <PrivateRoute path="/room" component={Room} user={currentUser} />
          <Route
            exact
            path="/"
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} user={currentUser}/>}
          />
        </Switch>
      </div>
    </div>
  )
}

export default App;