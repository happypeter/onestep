import React, {Component} from 'react'
import Button from 'material-ui/Button'
import styled from 'styled-components'

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
    // action
    if (this.props.checkUserExist) {
      this.props.sendMsgforSignup(this.props.phoneNum)
    } else {
      this.props.sendMsg(this.props.phoneNum)
    }
    clearInterval(this.timerId)
    this.timer()
  }

  render() {
    const {smsSendState} = this.props
    return (
      <div>
        <ShortButton
          raised={smsSendState.alreadySendMsg ? true : undefined}
          disabled={smsSendState.alreadySendMsg ? true : false}
          onClick={this.sendMsg}>
          {smsSendState.alreadySendMsg ? smsSendState.second : '发送'}
        </ShortButton>
      </div>
    )
  }
}

export default SmsSend

const ShortButton = styled(Button)`
  && {
    color: #00bcd4;
    font-size: 1em;
    height: 100%;
    line-height: 100%;
  }
`
