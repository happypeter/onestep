import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TopHeaderWrap = styled.div`
  background-color: #00BCD4;
  display: flex;
  justify-content: space-between;
`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
`

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

const Username = styled.span`
  font-size: 1em;
  padding: 0.5em;
  color: rgb(255, 226, 0);
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

class TopHeader extends Component {
  render () {
    const LoginButtons = (
      <div>
        <Button to='signup'>注册</Button>
        <Button to='/login'>登录</Button>
        <Button to='/wechatLogin'>微信登录</Button>
      </div>
    )

    const LogoutButtons = (
      <div>
        <Username>{this.props.sideButtons}</Username>
        <Button to='/' onClick={this.props.logout}>退出</Button>
      </div>
    )

    return (
      <TopHeaderWrap>
        <Button to='/'>
          首页
        </Button>
        <SideButtonsWrap>
          {
            this.props.sideButtons
            ? LogoutButtons
            : LoginButtons
          }
        </SideButtonsWrap>
      </TopHeaderWrap>
    )
  }
}

export default TopHeader
