import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import UserIcon from '@material-ui/icons/AccountCircle'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toobar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import MenuIcon from '@material-ui/icons/Menu'
import { DRAWER_WIDTH } from '../constants/GlobalStyle'

const styles = theme => ({
  appBar: {
    position: 'absolute',
    background: '#fff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: DRAWER_WIDTH
  }
})

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
    const {
      currentUser,
      isAuthenticated,
      toggleSidebar,
      classes: s,
      isSidebarOpen
    } = this.props
    const LoginButtons = (
      <SideButtonsWrap>
        <ButtonLink to="/signup">注册</ButtonLink>
        <ButtonLink to="/login">登录</ButtonLink>
      </SideButtonsWrap>
    )
    const { anchorEl } = this.state
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
      <AppBar
        className={classNames(s.appBar, { [s.appBarShift]: isSidebarOpen })}
      >
        <Toobar>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          {isAuthenticated ? LogoutButtons : LoginButtons}
        </Toobar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  goto: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired
}

export default withStyles(styles)(Header)

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
