import React from 'react'
import styled from 'styled-components'

const NotificationWrap = styled.div`
  background: #FFD466;
  color: #573D00;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  border-radius: 17px;
  text-align: center;
  width: 317px;
  height: 51px;
  font-weight: 200;
  line-height: 51px;
  position: fixed;
  margin: 0 auto;
  left:0;
  right:0;
  top: 0.3em;
  animation:notification 1s;
  @keyframes notification
  {
    0%   { top: 0.3em }
    50%  { top: 0.8em }
    100% { top: 0.3em }
  }
`

// const ColseWrap = styled.div`
//   position: absolute;
//   top: -15px;
//   right: 15px;
//   cursor: pointer;
//   font-weight: 900;
// }
// `

export default props => (
  <NotificationWrap>
    {/* <ColseWrap onClick={props.removeNotification}>
      x
    </ColseWrap> */}
    {props.text}
  </NotificationWrap>
)
