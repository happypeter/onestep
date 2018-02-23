import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logoSimple from '../../assets/logoSimple.svg'
import Menu, { MenuItem } from 'material-ui/Menu'
import defaultAvatar from '../../assets/avatarIcon.svg'
import isEmpty from 'lodash.isempty'

class TopHeader extends Component {
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

  goToProfile = () => {
    this.props.history.push('/user/profile')
  }

  goToSettings = () => {
    this.props.history.push('/settings')
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    const { currentUser, isAuthenticated } = this.props.auth
    const LoginButtons = (
      <SideButtonsWrap>
        <ButtonLink to="signup">注册</ButtonLink>
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
          {currentUser ? <MenuItem>{currentUser.username}</MenuItem> : null}
          <MenuItem onClick={this.goToProfile}>个人中心</MenuItem>
          <MenuItem onClick={this.goToSettings}>设置</MenuItem>
          <MenuItem onClick={this.logout}>退出</MenuItem>
        </PopMenu>
      </SideButtonsWrap>
    )

    return (
      <TopHeaderWrap>
        <HomeWrap>
          <img
            src={logoSimple}
            alt="logo-simple"
            width="35.35px"
            onClick={this.backToHome}
          />
          <ButtonLink to="/">好奇猫</ButtonLink>
        </HomeWrap>
        {isAuthenticated ? LogoutButtons : LoginButtons}
      </TopHeaderWrap>
    )
  }
}

export default TopHeader

const TopHeaderWrap = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`

const HomeWrap = styled.div`
  font-size: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (min-width: 1024px) {
    font-size: 1.56em;
  }
`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
`

const ButtonLink = styled(Link)`
  font-size: 0.8em;
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
