import React, {useEffect, useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import Footer from './components/Footer'
import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken')
  return <Route {...rest} render={(props) => {return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />}}/>
}

function App() {
  let [currentUser, setCurrentUser] = useState("")
  let [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false)
    } else {
      token = jwtDecode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      setIsAuthenticated(true)
    }
  }, [])

  const nowCurrentUser = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route 
            path="/login" 
            render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>} 
          />
          <PrivateRoute path="/profile" component={Profile} user={currentUser} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App;