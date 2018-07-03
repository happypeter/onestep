import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Drawer from '@material-ui/core/Drawer'
import TocList from '../containers/TocListContainer'
import DrawerNav from './DrawerNav'
import { DRAWER_WIDTH } from '../constants/GlobalStyle'

const styles = () => ({
  main: {
    marginLeft: DRAWER_WIDTH
  },
  drawer: {
    border: '2px solid red',
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
    <div>
      <Header
        currentUser={currentUser}
        goto={goto}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Drawer
        variant="persistent"
        // open={isSidebarOpen}
        open
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
      <div className={s.main}>{children}</div>
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
