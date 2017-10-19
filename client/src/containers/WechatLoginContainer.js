import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import WechatLogin from '../components/Login/WechatLogin'

class WechatLoginContainer extends Component {

  login = () => {
     this.props.dispatch({ type: 'AUTH_USER', userInfo: 'wechatCode' })
   }

  render () {
    const { isAuthenticated } = this.props
    const refererState = this.props.location.state

    if (isAuthenticated && refererState) {
      let refererPath = refererState.from.pathname
      return (
        <Redirect to={refererPath} />
      )
    } else if (isAuthenticated) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <WechatLogin onClick={this.login} refererState={refererState}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.fakeAuth.isAuthenticated
})

export default connect(mapStateToProps)(WechatLoginContainer)
