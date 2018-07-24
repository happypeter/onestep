import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toobar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import MenuIcon from '@material-ui/icons/Menu'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import { DRAWER_WIDTH, HEADER_HEIGHT } from '../../constants/GlobalStyle'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  appBar: {
    position: 'absolute',
    background: '#fff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between'
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
  render() {
    const { toggleDrawer, classes: s, isDrawerOpen, width } = this.props
    const disableGutters = width === 'xs' || width === 'sm'
    const elevation = width === 'xs' || width === 'sm' ? 1 : 0
    return (
      <AppBar
        className={classNames(s.appBar, {
          [s.appBarShift]: isDrawerOpen
        })}
        elevation={elevation}
      >
        <Toobar disableGutters={disableGutters} className={s.toolbar}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <div>
            <Button href="/login">登录</Button>
            <Button href="/signup">注册</Button>
          </div>
        </Toobar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(Header)
