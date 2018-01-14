import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from '../components/Login/Login'
import {login} from '../redux/actions/authAction'
import {
  getCurrentUser,
} from '../redux/selectors/commonSelectors.js'

class LoginContainer extends Component {
  render() {
    const {isAuthenticated} = this.props.currentUser
    const refererState = this.props.location.state

    // 跳回登录前的页面
    let refererPath
    if (!refererState || !refererState.from) {
      // 直接点登录按钮而来
      // console.log('home')
      refererPath = '/'
    } else if (refererState.from.pathname) {
      // 从受保护课程页面直接跳转而来
      // console.log('direct; course')
      refererPath = refererState.from.pathname
    } else {
      // 微信登录页面相关
      // console.log('from wc; course')
      refererPath = refererState.from.from.pathname
    }

    if (isAuthenticated) {
      if (refererPath === '/') {
        this.props.history.goBack()
        return null
      }
      return <Redirect to={refererPath} />
    }

    return (
      <Login {...this.props} />
    )
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
})

export default connect(mapStateToProps, {
  login
})(LoginContainer)
