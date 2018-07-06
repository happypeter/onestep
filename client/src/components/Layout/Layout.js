import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '../../containers/DrawerContainer'
import { DRAWER_WIDTH } from '../../constants/GlobalStyle'

import Header from './Header'

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
  },
  content: {
    marginLeft: -DRAWER_WIDTH,
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: DRAWER_WIDTH,
  },
  main: {
    flexGrow: 1,
    overflow: 'auto',
    position: 'relative',
  },
  mainInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

class Layout extends React.Component {
  render () {
    const {
      children, toggleDrawer, isDrawerOpen, goto, currentUser, classes: s,
    } = this.props

    return (
      <div className={s.root}>
        <Header
          currentUser={currentUser}
          goto={goto}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <Drawer />
        <div>{children}</div>
      </div>
    )
  }
}

Layout.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
}

export default withStyles(styles)(Layout)
