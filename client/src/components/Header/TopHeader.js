import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TopHeaderWrap = styled.div`
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;

`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
  padding: 1em;
  @media (min-width: 1024px) {
    padding: 1em 6em;
  }
`

const Button = styled(Link)`
  font-size: 1em;
  padding: 0.5em;
  color: #212121;
  line-height: 2;
  transition: all 0.5s ease;
  text-decoration: none;
  @media (min-width: 1024px) {
    font-size: 1em;
    padding: 0.5em;
  }
`

const Username = styled(Link)`
  font-size: 1em;
  padding: 0.5em;
  color: rgb(255, 226, 0);
  line-height: 2;
  transition: all 0.5s ease;
  font-weight: 600;
  text-decoration: none;
  @media (min-width: 1024px) {
    font-size: 1em;
    padding: 0.5em;
  }
`

const HomeWrap = styled.div`
  font-size: 1.56em;
  display: flex;
  align-items: center;
  margin-left: 1em;
  @media (min-width: 1024px) {
    margin-left: 4em;
  }
`

class TopHeader extends Component {
  render () {
    const LoginButtons = (
      <SideButtonsWrap>
        <Button to='signup'>注册</Button>
        <Button to='/login'>登录</Button>
        <Button to='/wechatLogin' style={{display: 'none'}}>微信登录</Button>
      </SideButtonsWrap>
    )

    const LogoutButtons = (
      <SideButtonsWrap>
        <Username to='/profile'>{this.props.sideButtons}</Username>
        <Button to='/' onClick={this.props.logout}>退出</Button>
      </SideButtonsWrap>
    )

    return (
      <TopHeaderWrap>
        <HomeWrap>
          <img src={require('../../assets/logoSimple.svg')} alt='logo-simple' width='55px' />
          <Button to='/'>
            首页
          </Button>
        </HomeWrap>
        {
          this.props.sideButtons
          ? LogoutButtons
          : LoginButtons
        }
      </TopHeaderWrap>
    )
  }
}

export default TopHeader
