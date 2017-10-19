import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TopHeader from '../components/Header/TopHeader'

class TopHeaderContainer extends Component {
  render () {
    console.log(this.props.currentUser.isAuthenticated);
    const LoginLink = (
      <div>
        <Link className='headerButton' to='signup'>注册</Link>
        <Link className='headerButton' to='/login'>登录</Link>
        <Link className='headerButton' to='/wechatLogin'>微信登录</Link>
      </div>
  )

    const LogoutLink = (
      <div>
        <span className='headerButton'>fakeName</span>
        <Link className='headerButton' to=''>退出</Link>
      </div>
  )
    return (
      <TopHeader
        sideButtons={this.props.currentUser.isAuthenticated ? LogoutLink : LoginLink}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.fakeAuth
})

export default connect(mapStateToProps)(TopHeaderContainer)
