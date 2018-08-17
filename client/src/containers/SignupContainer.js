import React from 'react'
import { connect } from 'react-redux'
import Signup from '../components/Signup/Signup'
import { signup } from '../redux/actions/authAction'
import { getIsAuthenticated } from '../redux/selectors/commonSelectors.js'

const SignupContainer = props => {
  if (props.isAuthenticated) {
    props.history.push('/')
    return null
  }
  return <Signup {...props} />
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(
  mapStateToProps,
  {
    signup
  }
)(SignupContainer)
