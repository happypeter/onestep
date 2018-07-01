import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logoSimple from '../assets/logoSimple.svg'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import defaultAvatar from '../assets/avatarIcon.svg'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'

class Header extends Component {
  state = {
    anchorEl: null
  }

  handlePopoverOpen = e => {
    this.setState({ anchorEl: e.target })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }

  backToHome = () => {
    this.props.history.push('/')
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    const { currentUser, isAuthenticated, goto } = this.props
    const LoginButtons = (
      <SideButtonsWrap>
        <ButtonLink to="/signup">注册</ButtonLink>
        <ButtonLink to="/login">登录</ButtonLink>
      </SideButtonsWrap>
    )
    const { anchorEl } = this.state
    let avatar = defaultAvatar
    if (currentUser && !isEmpty(currentUser.bindings)) {
      const weChat = currentUser.bindings.find(item => item.via === 'wechat')
      avatar = weChat.headImgUrl
    }
    const LogoutButtons = (
      <SideButtonsWrap>
        <Avatar
          src={avatar}
          alt="avatar"
          onMouseOver={this.handlePopoverOpen}
          onTouchStart={this.handlePopoverOpen}
        />
        <PopMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handlePopoverClose}
        >
          {<MenuItem>{currentUser.username}</MenuItem>}
          <MenuItem onClick={() => goto('/user/profile')}>个人中心</MenuItem>
          <MenuItem onClick={() => goto('/settings')}>设置</MenuItem>
          <MenuItem onClick={this.logout}>退出</MenuItem>
        </PopMenu>
      </SideButtonsWrap>
    )

    return (
      <Wrap>
        <HeaderWrap>
          <HomeWrap onClick={this.backToHome}>
            <img src={logoSimple} alt="logo-simple" width="35.35px" />
            <span>好奇猫</span>
          </HomeWrap>
          {isAuthenticated ? LogoutButtons : LoginButtons}
        </HeaderWrap>
      </Wrap>
    )
  }
}

Header.propTypes = {
  goto: PropTypes.func.isRequired
}

export default Header

const Wrap = styled.div`
  background-color: #ffffff;
`
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`

const HomeWrap = styled.div`
  font-size: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 1.56em;
  }
`

const SideButtonsWrap = styled.div`
  display: flex;
  align-items: center;
`

const ButtonLink = styled(Link)`
  font-size: 1em;
  padding-left: 24px;
  color: #212121;
  font-weight: 500;
  transition: all 0.5s ease;
  text-decoration: none;
`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  display: block;
  border-radius: 15px;
`

const PopMenu = styled(Menu)`
  && {
    top: 40px;
  }
  ul {
    padding: 0;
  }
  li {
    padding-right: 3em;
  }
`
