import React, { Component } from 'react'
import { connect } from 'react-redux'
import TopHeader from '../components/Header/TopHeader'
import { logout } from '../redux/actions/authAction'
import PropTypes from 'prop-types'
import Notification from './NotificationContainer'

class TopHeaderContainer extends Component {
  logout = () => {
    this.props.logout()
  }

  render () {
    let tempIsAuthenticated = window.sessionStorage.getItem('user')

    return (
      <div>
        <TopHeader
          sideButtons={tempIsAuthenticated}
          logout={this.logout}
        />
        <Notification />
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

export default connect(mapStateToProps, { logout })(TopHeaderContainer)
