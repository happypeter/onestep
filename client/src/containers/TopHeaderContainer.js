import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import TopHeader from '../components/Header/TopHeader'
import {logout} from '../redux/actions/authAction'
import {getCurrentUser} from '../redux/selectors/commonSelectors.js'
import PropTypes from 'prop-types'
import {getNotification} from '../redux/selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'
import {clearNotification} from '../redux/actions/notificationAction'

class TopHeaderContainer extends Component {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = data => {
    this.setState({anchorEl: data})
  }

  handlePopoverClose = () => {
    this.setState({anchorEl: null})
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

  render() {
    const tempIsAuthenticated = window.sessionStorage.getItem('user')
    const {anchorEl} = this.state
    const {notification, clearNotification} = this.props
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
        {notification.text ? (
          <Notification
            text={notification.text}
            clearNotification={clearNotification}
          />
        ) : null}
      </div>
    )
  }
}

TopHeaderContainer.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentUserInfo: getCurrentUser(state),
  notification: getNotification(state),
})

export default connect(mapStateToProps, {logout, clearNotification})(
  withRouter(TopHeaderContainer),
)
