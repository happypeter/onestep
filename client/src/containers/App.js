import React, {Component} from 'react'
import Main from './Main'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/actions/authAction'
import {fetchProfile} from '../redux/actions/profileAction'
import {getIsAuthenticated} from '../redux/selectors/commonSelectors'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

class App extends Component {
  componentWillMount() {
    function setAuthorizationToken(token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`
      } else {
        delete axios.defaults.headers.common['Authorization']
      }
    }
    const jwtToken = sessionStorage.jwtToken
    if (jwtToken) {
      try {
        const result = jwtDecode(jwtToken)
        if (result) {
          setAuthorizationToken(jwtToken)
          this.props.setCurrentUser(result)
          this.props.fetchProfile()
        } else {
          this.props.setCurrentUser({})
        }
      } catch (error) {
        return
      }
    }
  }

  render() {
    return <Main {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(mapStateToProps, {setCurrentUser, fetchProfile})(App)
