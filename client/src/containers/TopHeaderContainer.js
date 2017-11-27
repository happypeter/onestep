import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopHeader from '../components/Header/TopHeader'
import { logout } from '../redux/actions/authAction'
import PropTypes from 'prop-types'

import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncNotification = Loadable({
  loader: () => import('./NotificationContainer'),
  loading: LoadingComponent,
  delay: 300
})

class TopHeaderContainer extends Component {
  logout = () => {
    this.props.logout()
  }

  backToHome = () => {
    this.props.history.push('/')
  }

  render () {
    let tempIsAuthenticated = window.sessionStorage.getItem('user')

    return (
      <div>
        <TopHeader
          sideButtons={tempIsAuthenticated}
          logout={this.logout}
          backToHome={this.backToHome}
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
  currentUserInfo: state.fakeAuth
})

export default connect(mapStateToProps, { logout })(withRouter(TopHeaderContainer))
