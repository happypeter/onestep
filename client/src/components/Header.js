import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import UserIcon from '@material-ui/icons/AccountCircle'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// TODO: 仿照 gitbook 的用户体验，点按钮，抽屉中显示课程目录

class Header extends Component {
  state = {
    anchorEl: null
  }

  handlePopoverOpen = e => {
    this.setState({ anchorEl: e.target })
  }

  handleClick = path => {
    this.props.goto(path)
    this.setState({ anchorEl: null })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  logout = () => {
    this.props.logout()
    this.setState({ anchorEl: null })
  }

  render() {
    const { currentUser, isAuthenticated } = this.props
    const LoginButtons = (
      <SideButtonsWrap>
        <ButtonLink to="/signup">注册</ButtonLink>
        <ButtonLink to="/login">登录</ButtonLink>
      </SideButtonsWrap>
    )
    const { anchorEl } = this.state
    console.log('anchorEl', anchorEl)
    const LogoutButtons = (
      <SideButtonsWrap>
        <UserIcon onClick={this.handlePopoverOpen} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.handleClick('/user/profile')}>
            {currentUser.username}
          </MenuItem>
          <MenuItem onClick={this.logout}>退出</MenuItem>
        </Menu>
      </SideButtonsWrap>
    )

    return (
      <Wrap>
        <HeaderWrap>
          <IconButton>
            <MenuIcon />
          </IconButton>
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
