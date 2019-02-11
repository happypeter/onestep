import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Header from './Header'
import NotificationContianer from '../../containers/NotificationContianer'

const styles = theme => ({
  root: {},
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8
  }
})

class Layout extends React.Component {
  componentDidMount() {}

  render() {
    const { children, classes: s } = this.props

    return (
      <div className={s.root}>
        <Header />
        <NotificationContianer />
        <div className={classNames(s.content)}>{children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(Layout)
