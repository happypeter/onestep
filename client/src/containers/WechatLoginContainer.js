import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import WechatLogin from '../components/Login/WechatLogin'
import { login } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

class WechatLoginContainer extends Component {

  login = () => {
    this.props.login({
      username: 'wechatCode',
      password: ''
    })
   }

  render () {
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
      </div>
    )
  }
}

WechatLoginContainer.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.fakeAuth.isAuthenticated
})

export default connect(mapStateToProps, { login })(WechatLoginContainer)
