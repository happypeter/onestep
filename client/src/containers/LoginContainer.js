import React from 'react'
import {connect} from 'react-redux'
import Login from '../components/Login/Login'
import {login} from '../redux/actions/authAction'
import {
  getIsAuthenticated,
} from '../redux/selectors/commonSelectors.js'

const LoginContainer = (props) => {
  if (props.isAuthenticated) {
    return props.history.goBack()
  }
  return <Login {...props} />
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(mapStateToProps, {
  login
})(LoginContainer)
