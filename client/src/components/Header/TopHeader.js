import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import logoSimple from '../../assets/logoSimple.svg'
import Menu, {MenuItem} from 'material-ui/Menu'

class TopHeader extends Component {
  state = {
    anchorEl: null,
  }

  handlePopoverOpen = e => {
    this.setState({anchorEl: e.target})
  }

  handlePopoverClose = () => {
    this.setState({anchorEl: null})
  }

  backToHome = () => {
    this.props.history.push('/')
  }

  goToProfile = () => {
    this.props.history.push('/user/profile')
  }

  goToSettings = () => {
    this.props.history.push('/settings/account')
  }

  logout = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const {currentUser, isAuthenticated} = this.props.auth
    const LoginButtons = (
      <SideButtonsWrap>
        <ButtonLink to="signup">注册</ButtonLink>
        <ButtonLink to="/login">登录</ButtonLink>
      </SideButtonsWrap>
    )
    const {anchorEl} = this.state
    const LogoutButtons = (
      <SideButtonsWrap>
        <div>
          <div
            onMouseOver={this.handlePopoverOpen}
            onTouchStart={this.handlePopoverOpen}>
            <Username>{currentUser.username}</Username>
          </div>

          <PopMenu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handlePopoverClose}>
            <MenuItem onClick={this.goToProfile}>个人中心</MenuItem>
            <MenuItem onClick={this.goToSettings}>设置</MenuItem>
            <MenuItem onClick={this.logout}>退出</MenuItem>
          </PopMenu>
        </div>
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
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0 auto;
  }
`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
  padding: 1em;
  @media (min-width: 1024px) {
    padding: 1em 6em;
  }
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

const Username = styled.div`
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

const HomeWrap = styled.div`
  font-size: 1em;
  display: flex;
  align-items: center;
  margin-left: 1em;
  cursor: pointer;
  @media (min-width: 1024px) {
    font-size: 1.56em;
    margin-left: 4em;
  }
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
