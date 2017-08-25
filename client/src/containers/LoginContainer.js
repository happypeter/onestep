import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../components/Login/Login'

class LoginContainer extends Component {

  login = () => {
     this.props.dispatch({ type: 'IS_AUTH' })
     this.props.dispatch({ type: 'TO_REFERRER' })
   }

  render () {
    const { redirectToReferrer } = this.props
    const refererState = this.props.location.state

    if (redirectToReferrer && refererState) {
      let refererPath = refererState.from.pathname
      return (
        <Redirect to={refererPath} />
      )
    } else if (redirectToReferrer) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <Login onClick={this.login} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  redirectToReferrer: state.fakeAuth.redirectToReferrer
})

export default connect(mapStateToProps)(LoginContainer)
