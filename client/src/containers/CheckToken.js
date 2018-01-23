import React from 'react'
import {connect} from 'react-redux'
import {getIsAuthenticated} from '../redux/selectors/commonSelectors.js'
import {Redirect} from 'react-router-dom'

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends Component {
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

  const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
