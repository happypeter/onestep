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
  .headerButton {
    font-size: 1em;
    padding: 0.5em;
    color: white;
    line-height: 3;
    opacity: 0.8;
    transition: all 0.5s ease;
    font-weight: 600;
    text-decoration: none;
    @media (min-width: 850px) {
      font-size: 1.2em;
      padding: 0.5em 1.3em;
    }
  }
  .username {
    color: rgb(255, 226, 0);
  }
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

class TopHeader extends Component {
  render () {
    return (
      <TopHeaderWrap>
        <Button to='/'>
          首页
        </Button>
        <SideButtonsWrap>
          {this.props.sideButtons}
          {/* <Button to='signup'>注册</Button>
          <Button to='/login'>登录</Button>
          <Button to='/wechatLogin'>微信登录</Button> */}
        </SideButtonsWrap>
      </TopHeaderWrap>
    )
  }
}

export default TopHeader
