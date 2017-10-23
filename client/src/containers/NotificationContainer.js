import React, { Component } from 'react'
import Notification from '../components/Header/Notification'

class NotificationContainer extends Component {

  onClick = () => {
    console.log("onClick");
  }
  
  render () {
    return (
      <Notification onClick={this.onClick} />
    )
  }
}

export default NotificationContainer
