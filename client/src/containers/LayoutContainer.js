import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto } from '../redux/actions'
import Layout from '../components/Layout/Layout'
import {
  getIsAuthenticated,
  getCurrentUser,
  getNotification
} from '../redux/selectors/commonSelectors'
import { logOut, checkAuth, getProfile } from '../redux/actions/authAction'
import { clearNotification } from '../redux/actions/index'

class LayoutContainer extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getProfile()
    }
  }

  render() {
    return <Layout {...this.props} />
  }
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  currentUser: getCurrentUser(state),
  notification: getNotification(state)
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      goto,
      logOut,
      checkAuth,
      clearNotification,
      getProfile
    }
  )(LayoutContainer)
)
