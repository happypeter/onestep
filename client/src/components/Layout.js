import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Drawer from '@material-ui/core/Drawer'

const styles = () => ({
  root: {}
})

const Layout = ({
  notification,
  children,
  clearNotification,
  classes: s,
  ...props
}) => {
  return (
    <div>
      <Header {...props} />
      <Drawer
        ModalProps={{ BackdropProps: { invisible: true } }}
        open
        className={s.drawer}
      >
        hello draweer
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
      {children}
    </div>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired
}

export default withStyles(styles)(Layout)
