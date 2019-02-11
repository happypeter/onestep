import React from 'react'
import { connect } from 'react-redux'
import Notification from '../components/Notification'
import { clearNotification } from '../redux/actionCreators'

const NotificationContainer = props => <Notification {...props} />

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(
  mapStateToProps,
  { clearNotification }
)(NotificationContainer)
