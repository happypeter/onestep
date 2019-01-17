import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Header from './Header'

const styles = theme => ({
  root: { backgroundColor: '#f8fafc' },
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8
  },
  footer: {
    backgroundColor: '#ececec',
    padding: theme.spacing.unit * 6,
    width: '100%'
  }
})

class Layout extends React.Component {
  render() {
    const {
      notification,
      clearNotification,
      children,
      goto,
      isAuthenticated,
      currentUser,
      classes: s,
      logOut
    } = this.props

    return (
      <div className={s.root}>
        <Header
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          goto={goto}
          logOut={logOut}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="error"
          open={Boolean(notification)}
          autoHideDuration={3000}
          message={notification}
          onClose={clearNotification}
        />
        <div className={s.content}>{children}</div>
        <div className={s.footer} />
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
