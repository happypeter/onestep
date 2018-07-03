import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Snackbar from '@material-ui/core/Snackbar'
import Drawer from '@material-ui/core/Drawer'
import TocList from '../containers/TocListContainer'
import DrawerNav from './DrawerNav'
import { DRAWER_WIDTH } from '../constants/GlobalStyle'

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  content: {
    marginLeft: -DRAWER_WIDTH,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    position: 'relative',
    width: DRAWER_WIDTH
  }
})

const Layout = ({
  notification,
  children,
  clearNotification,
  toggleSidebar,
  isSidebarOpen,
  goto,
  currentUser,
  isOnEpisodePage,
  classes: s
}) => {
  return (
    <div className={s.root}>
      <Header
        currentUser={currentUser}
        goto={goto}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        classes={{
          paper: s.drawer
        }}
      >
        <DrawerNav toggleSidebar={toggleSidebar} goto={goto} />
        {isOnEpisodePage && <TocList />}
      </Drawer>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        variant="error"
        open={Boolean(notification)}
        autoHideDuration={3000}
        message={notification}
        onClose={clearNotification}
      />
      <div
        className={classNames(s.content, {
          [s.contentShift]: isSidebarOpen
        })}
      >
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isOnEpisodePage: PropTypes.bool.isRequired
}

export default withStyles(styles)(Layout)
