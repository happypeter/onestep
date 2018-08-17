import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'
import { getIsAuthenticated } from '../redux/selectors/commonSelectors'
import { login } from '../redux/actions/authAction'

const LoginContainer = props => {
  if (props.isAuthenticated) {
    props.history.push('/')
    return null
  }
  return <Login {...props} />
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(
  mapStateToProps,
  { login }
)(LoginContainer)
