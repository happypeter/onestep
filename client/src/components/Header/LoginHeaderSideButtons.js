import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled(Link)`
  font-size: 1em;
  padding: 0.5em;
  color: white;
  line-height: 2;
  opacity: 0.8;
  transition: all 0.5s ease;
  font-weight: 600;
  text-decoration: none;
  @media (min-width: 850px) {
    font-size: 1.2em;
    padding: 0.5em 1.3em;
  }
`

export default () => (
  <div>
    <Button to='signup'>注册</Button>
    <Button to='/login'>登录</Button>
    <Button to='/wechatLogin'>微信登录</Button>
  </div>
)
