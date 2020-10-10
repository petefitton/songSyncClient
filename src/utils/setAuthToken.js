import axios from 'axios'

// Add authorized user's JWT to the request header

const setAuthToken = token => {
  if (token) {
    // Apply token to all request headers
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken;