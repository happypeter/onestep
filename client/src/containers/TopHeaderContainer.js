import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopHeader from '../components/Header/TopHeader'
import { logout } from '../redux/actions/authAction'
import { getCurrentUser } from '../selectors/commonSelectors.js'
import PropTypes from 'prop-types'

import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncNotification = Loadable({
  loader: () => import('./NotificationContainer'),
  loading: LoadingComponent,
  delay: 300
})

class TopHeaderContainer extends Component {
  state = {
    anchorEl: null
  }

  handlePopoverOpen = (data) => {
    this.setState({ anchorEl: data })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  goToProfile = () => {
    this.props.history.push('/user/profile')
  }

  goToSettings = () => {
    this.props.history.push('/settings/account')
  }

  backToHome = () => {
    this.props.history.push('/')
  }

  render () {
    const tempIsAuthenticated = window.sessionStorage.getItem('user')
    const { anchorEl } = this.state

    return (
      <div>
        <TopHeader
          sideButtons={tempIsAuthenticated}
          logout={this.logout}
          goToProfile={this.goToProfile}
          goToSettings={this.goToSettings}
          backToHome={this.backToHome}
          handlePopoverOpen={this.handlePopoverOpen}
          handlePopoverClose={this.handlePopoverClose}
          anchorEl={anchorEl}
        />
        <AsyncNotification />
      </div>

    )
  }
}

TopHeaderContainer.propTypes = {
  logout: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  currentUserInfo: getCurrentUser(state)
})

export default connect(mapStateToProps, { logout })(withRouter(TopHeaderContainer))
