import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class SmsSend extends Component {
  timerId = null

  componentWillUnmount() {
    clearInterval(this.timerId)
    this.props.smsSendInit()
  }

  timer = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.props.countdown()
    if (this.props.smsSendState.second <= 0) {
      this.props.readyToSendMsg()
      clearInterval(this.timerId)
    }
  }

  sendMsg = () => {
    if (!this.props.phoneNumIsValid) return
    this.props.sendMsgforSignup(this.props.phoneNum)
    clearInterval(this.timerId)
    this.timer()
  }

  render() {
    const { smsSendState } = this.props
    return (
      <Button
        disabled={smsSendState.alreadySendMsg ? true : false}
        onClick={this.sendMsg}
      >
        {smsSendState.alreadySendMsg ? smsSendState.second : '发送'}
      </Button>
    )
  }
}

export default SmsSend
