import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: '#ececec',
    padding: theme.spacing.unit * 6,
    width: '100%'
  }
})

const Footer = ({ classes: s }) => <div className={s.root} />

export default withStyles(styles)(Footer)
