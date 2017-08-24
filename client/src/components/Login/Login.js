import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './login.css'

class Login extends Component {

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
      <div className='home'>
        <button onClick={this.login} className='fake-code'>点击假装微信扫码登录</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  redirectToReferrer: state.fakeAuth.redirectToReferrer
})

export default connect(mapStateToProps)(Login)
