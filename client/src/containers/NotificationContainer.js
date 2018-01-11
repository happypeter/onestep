import React from 'react'
import {connect} from 'react-redux'
import {getNotification} from '../redux/selectors/commonSelectors.js'
import Notification from '../components/Notification/Notification'

const NotificationContainer = props => <Notification {...props} />

const mapStateToProps = state => ({
  notification: getNotification(state),
})

export default connect(mapStateToProps)(NotificationContainer)
