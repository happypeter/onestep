import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toobar from '@material-ui/core/Toolbar'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { HEADER_HEIGHT } from '../../constants/GlobalStyle'

const styles = theme => ({
  appBar: { backgroundColor: '#fff' },
  toolbar: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between'
  }
})

class Header extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  goToProfile = () => {
    this.props.goto('/profile')
    this.handleClose()
  }

  logOut = () => {
    this.props.logOut()
    this.handleClose()
  }

  render() {
    const { classes: s, width, isAuthenticated, currentUser, goto } = this.props
    const disableGutters = width === 'xs' || width === 'sm'
    const elevation = width === 'xs' || width === 'sm' ? 1 : 0
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <AppBar className={s.appBar} elevation={elevation}>
        <Toobar disableGutters={disableGutters} className={s.toolbar}>
          <Button onClick={() => goto('/')}>首页</Button>
          {isAuthenticated ? (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem>{currentUser.userName}</MenuItem>
                <MenuItem onClick={this.goToProfile}>我的页面</MenuItem>
                <MenuItem onClick={this.logOut}>退出</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button onClick={() => goto('/login')}>登录</Button>
              <Button onClick={() => goto('/signup')}>注册</Button>
            </div>
          )}
        </Toobar>
      </AppBar>
    )
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(Header)
