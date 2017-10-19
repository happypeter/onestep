import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'

class LoginContainer extends Component {
  handleSubmit = (userInfo) => {
    this.props.dispatch({ type: 'AUTH_USER', userInfo: userInfo})
  }

  render () {
    const { isAuthenticated } = this.props.currentUser
    const refererState = this.props.location.state

    if (isAuthenticated && refererState) {
      let refererPath = refererState.from.from.pathname
      return (
        <Redirect to={refererPath} />
      )
    } else if (isAuthenticated) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <Login onSubmit={this.handleSubmit}/>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth
})

export default connect(mapStateToProps)(LoginContainer)
