import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TopHeader from '../components/Header/TopHeader'
import { logout } from '../redux/actions/authAction'
import PropTypes from 'prop-types'
import Notification from './NotificationContainer'

class TopHeaderContainer extends Component {
  logout = () => {
    this.props.logout()
  }

  render () {
    let tempIsAuthenticated = window.localStorage.getItem('userInfo')

    const LoginLink = (
      <div>
        <Link className='headerButton' to='signup'>注册</Link>
        <Link className='headerButton' to='/login'>登录</Link>
        <Link className='headerButton' to='/wechatLogin'>微信登录</Link>
      </div>
    )

    const LogoutLink = (
      <div>
        {/* <span className='headerButton'>{this.props.currentUserInfo.currentUser.username}</span> */}
        <span className='headerButton'>{tempIsAuthenticated}</span>
        <Link className='headerButton' to='/' onClick={this.logout}>退出</Link>
      </div>
    )

    return (
      <div>
        <TopHeader
          // sideButtons={this.props.currentUserInfo.isAuthenticated ? LogoutLink : LoginLink}
          sideButtons={tempIsAuthenticated ? LogoutLink : LoginLink}
        />
        <Notification />
      </div>

    )
  }
}

TopHeaderContainer.propTypes = {
  logout: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps, { logout })(TopHeaderContainer)
