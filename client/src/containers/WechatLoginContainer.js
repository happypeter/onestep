import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import WechatLogin from '../components/Login/WechatLogin'
import { fakeWechatLogin } from '../redux/actions/authAction'
import PropTypes from 'prop-types'
import Notification from './NotificationContainer'

class WechatLoginContainer extends Component {

  login = () => {
    this.props.fakeWechatLogin({
      username: 'wechatCode'
    })
   }

  render () {
    // console.log(this.props)
    const { isAuthenticated } = this.props
    const refererState = this.props.location.state
    const refererPath = refererState ? refererState.from.pathname : '/'

    if (isAuthenticated) {
      return (
        <Redirect to={refererPath} />
      )
    }

    return (
      <div>
        <WechatLogin onClick={this.login} refererState={refererState}/>
        <Notification />
      </div>
    )
  }
}

WechatLoginContainer.propTypes = {
  fakeWechatLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.fakeAuth.isAuthenticated
})

export default connect(mapStateToProps, { fakeWechatLogin })(WechatLoginContainer)
