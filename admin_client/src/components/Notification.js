import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: 24,
    backgroundColor: '#ececec',
    color: '#ff4081',
    textAlign: 'center'
  }
})

class Notification extends Component {
  componentDidUpdate() {
    const { notification, clearNotification } = this.props
    if (notification.text) {
      this.timer = setTimeout(() => {
        clearNotification()
      }, 3000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const { classes: s, notification } = this.props
    if (notification.text) {
      return <div className={s.root}>{notification.text}</div>
    }
    return null
  }
}

export default withStyles(styles)(Notification)
