import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toobar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import MenuIcon from '@material-ui/icons/Menu'
import {
  DRAWER_WIDTH,
  DRAWER_WIDTH_XS,
  HEADER_HEIGHT
} from '../../constants/GlobalStyle'

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
    height: HEADER_HEIGHT
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,

    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH_XS}px)`
    }
  }
})

class Header extends Component {
  render() {
    const { toggleDrawer, classes: s, isSidebarOpen } = this.props

    return (
      <AppBar
        className={classNames(s.appBar, { [s.appBarShift]: isSidebarOpen })}
      >
        <Toobar className={s.toolbar}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toobar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  goto: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired
}

export default withStyles(styles)(Header)
