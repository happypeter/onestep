import React from 'react'
import {connect} from 'react-redux'
import {checkToken} from '../redux/actions/authAction'
import {getIsAuthenticated} from '../redux/selectors/commonSelectors.js'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends Component {
    componentDidMount() {
      this.checkAuth()
    }

    checkAuth() {
      let token = window.sessionStorage.getItem('jwtToken')
      this.props.checkToken(token)
    }

    render() {
      return this.props.isAuthenticated ? (
        <Component {...this.props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: this.props.location},
          }}
        />
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    checkToken: PropTypes.func.isRequired,
  }
  const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
  })

  return connect(mapStateToProps, {checkToken})(AuthenticatedComponent)
}
