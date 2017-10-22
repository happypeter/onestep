import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'
import { login } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class LoginContainer extends Component {
  handleSubmit = (userInfo) => {
    // window.localStorage.setItem('userInfo', userInfo.username)
    // this.props.dispatch({ type: 'AUTH_USER', userInfo: userInfo})
    this.props.login(userInfo)
  }

  render () {
    const { isAuthenticated } = this.props.currentUser
    const refererState = this.props.location.state

    let refererPath
    if (!refererState || !refererState.from) {
      console.log('home')
      refererPath = '/'
    } else if (refererState.from.pathname) {
      console.log('direct; course')
      refererPath = refererState.from.pathname
    } else {
      console.log('from wc; course')
      refererPath = refererState.from.from.pathname
    }

    if (isAuthenticated) {
      return (
        <Redirect to={refererPath} />
      )
    }

    return (
      <Login onSubmit={this.handleSubmit}/>
    )
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth
})

export default connect(mapStateToProps, { login })(LoginContainer)
