import React from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, IconButton } from '@material-ui/core'

const styles = theme => ({
  btnWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  userWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  userIconLoggedIn: {
    color: theme.palette.primary.main
  },
  menuItem: {
    width: 200
  }
})

class DrawerFooter extends React.Component {
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
    const { currentUser, isAuthenticated, goto, classes: s } = this.props

    const { anchorEl } = this.state
    const loggedInItem = (
      <div>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/user/profile')}
        >
          个人中心
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={() => this.handleClick('/')}>
          首页
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={this.logout}>
          退出
        </MenuItem>
      </div>
    )

    const loggedOutItem = (
      <div>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/login')}
        >
          登录
        </MenuItem>
        <MenuItem
          className={s.menuItem}
          onClick={() => this.handleClick('/signup')}
        >
          注册
        </MenuItem>
        <MenuItem className={s.menuItem} onClick={() => this.handleClick('/')}>
          首页
        </MenuItem>
      </div>
    )

    const auth = (
      <Toolbar className={s.userWrap}>
        <IconButton>
          <UserIcon
            className={classNames({ [s.userIconLoggedIn]: isAuthenticated })}
            onClick={this.handlePopoverOpen}
          />
        </IconButton>
        <Typography variant="title" c>
          {isAuthenticated ? ` Hello, ${currentUser.username}` : 'Good Day!'}
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={s.menu}
        >
          {isAuthenticated ? loggedInItem : loggedOutItem}
        </Menu>
      </Toolbar>
    )
    return <div>{auth}</div>
  }
}

DrawerFooter.propTypes = {
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(DrawerFooter)
