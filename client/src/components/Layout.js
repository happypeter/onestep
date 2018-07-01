import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

const Layout = ({ notification, children, clearNotification, ...props }) => {
  return (
    <div>
      <Header {...props} />
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
      {children}
    </div>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired
}

export default Layout
