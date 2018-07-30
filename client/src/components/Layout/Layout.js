import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import classNames from 'classnames'
import Header from './Header'

const styles = theme => ({
  root: {},
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8
  }
})

class Layout extends React.Component {
  componentDidMount() {
    const { isAuthenticated, currentUser, getProfile } = this.props
    if (isAuthenticated && !currentUser.coin) {
      getProfile()
    }
  }

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
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          variant="error"
          open={Boolean(notification)}
          autoHideDuration={3000}
          message={notification}
          onClose={clearNotification}
        />
        <div className={classNames(s.content)}>{children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
