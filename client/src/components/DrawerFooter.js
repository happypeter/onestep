import React from 'react'
import { Link } from 'react-router-dom'
import UserIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
    const { currentUser, isAuthenticated } = this.props
    const LoginButtons = (
      <div>
        <Link to="/signup">注册</Link>
        <Link to="/login">登录</Link>
      </div>
    )
    const { anchorEl } = this.state
    const LogoutButtons = (
      <div>
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
      </div>
    )
    return <div>{isAuthenticated ? LogoutButtons : LoginButtons}</div>
  }
}

export default DrawerFooter
