import React from 'react'
import { connect } from 'react-redux'
import { checkToken } from '../redux/actions/authAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends Component {

    componentDidMount () {
      this.checkAuth()
    }

    checkAuth () {
      let token = window.sessionStorage.getItem('jwtToken')
      this.props.checkToken(token)
      console.log('checklll')
    }

    render () {
      console.log(this.props)
      return (
        this.props.isAuthenticated ? (
          <Component {...this.props} />
              ) : (
                <Redirect to={{
                  pathname: '/wechatLogin',
                  state: { from: this.props.location }
                }} />
              )
      )
    }
    }

  AuthenticatedComponent.PropTypes = {
    checkToken: PropTypes.func.isRequired
  }
  const mapStateToProps = (state) => ({
    isAuthenticated: state.fakeAuth.isAuthenticated
  })

  return connect(mapStateToProps, { checkToken })(AuthenticatedComponent)
}
