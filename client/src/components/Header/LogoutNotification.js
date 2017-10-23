import React, { Component } from 'react'
import styled from 'styled-components'

const NotificationWrap = styled.div`
  background-color: #27AE60;
  text-align: center;
  WIDTH: 214PX;
  HEIGHT: 67PX;
  color: #FFF;
  font-size: 1.2em;
  line-height: 67px;
  position: absolute;
  top: 10px;
  right: 5px;
`

const ColseWrap = styled.div`
  position: absolute;
  top: -20px;
  right: 10px;
  cursor: pointer;
}
`

class LogoutNotification extends Component {
  render () {
    return (
      <NotificationWrap>
        <ColseWrap onClick={this.props.onClick}>
          x
        </ColseWrap>
        已经退出了
      </NotificationWrap>
    )
  }
}

export default LogoutNotification
