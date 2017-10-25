import React from 'react'
import styled from 'styled-components'

const NotificationWrap = styled.div`
  background-color: #27AE60;
  text-align: center;
  width: 163px;
  height: 67px;
  color: #FFF;
  font-weight: 200;
  line-height: 67px;
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 2px 2px 1px #0097A7;
  animation:notification 0.2s;
  @keyframes notification
  {
    0%   {right:0px; top:10px;}
    50%  {right:20px; top:10px;}
    100% {right:10px; top:10px;}
  }
`

const ColseWrap = styled.div`
  position: absolute;
  top: -20px;
  right: 10px;
  cursor: pointer;
  font-weight: 900;
}
`

export default props => (
  <NotificationWrap>
    <ColseWrap onClick={props.removeNotification}>
      x
    </ColseWrap>
    {props.text}
  </NotificationWrap>
)
