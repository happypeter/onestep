import React from 'react'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  btnWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  userWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.primary.main
  },
  welcome: {}
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
    const LoginButtons = (
      <div className={s.btnWrap}>
        <Button
          onClick={() => goto('/signup')}
          variant="outlined"
          color="primary"
        >
          注册
        </Button>
        <Button onClick={() => goto('/login')} variant="raised" color="primary">
          登录
        </Button>
      </div>
    )
    const { anchorEl } = this.state
    const LogoutButtons = (
      <div className={s.userWrap}>
        <UserIcon onClick={this.handlePopoverOpen} />
        <Typography variant="title" className={s.welcome}>
          Hello, {currentUser.username}
        </Typography>
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
      </div>
    )
    return (
      <Toolbar className={s.toolbar}>
        {isAuthenticated ? LogoutButtons : LoginButtons}
      </Toolbar>
    )
  }
}

DrawerFooter.propTypes = {
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(DrawerFooter)
