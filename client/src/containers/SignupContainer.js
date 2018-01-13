import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Signup from '../components/Signup/Signup'
import {signup} from '../redux/actions/authAction'
import {
  getCurrentUser,
} from '../redux/selectors/commonSelectors.js'

class SignupContainer extends Component {
  render() {
    const {isAuthenticated} = this.props.currentUser
    const refererState = this.props.location.state

    let refererPath
    if (!refererState || !refererState.from) {
      refererPath = '/'
    } else if (refererState.from.pathname) {
      refererPath = refererState.from.pathname
    } else {
      refererPath = refererState.from.from.pathname
    }

    if (isAuthenticated) {
      if (refererPath === '/') {
        this.props.history.goBack()
        return null
      }
      return <Redirect to={refererPath} />
    }

    return <Signup {...this.props} />
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
})

export default connect(mapStateToProps, {
  signup,
})(SignupContainer)
