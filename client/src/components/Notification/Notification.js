import React, {Component} from 'react'
import styled from 'styled-components'

class Notification extends Component {
  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  startTimer = () => {
    this.timer = setTimeout(() => {
      this.props.clearNotification()
      this.clearTimer()
    }, 1500)
  }

  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  render() {
    return <NotificationWrap>{this.props.text}</NotificationWrap>
  }
}

export default Notification

const NotificationWrap = styled.div`
  background: #ffd466;
  color: #573d00;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 17px;
  text-align: center;
  width: 317px;
  height: 51px;
  font-weight: 200;
  line-height: 51px;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0.3em;
  animation: notification 1s;
  @keyframes notification {
    0% {
      top: 0.3em;
    }
    50% {
      top: 0.8em;
    }
    100% {
      top: 0.3em;
    }
  }
`
