import React from 'react'
import { Link } from 'react-static'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: '#ececec',
    padding: theme.spacing.unit * 6,
    width: '100%'
  },
  logo: {
    width: 36,
    margin: '0 auto',
    display: 'block'
  }
})

const Footer = ({ classes: s }) => (
  <div className={s.root}>
    <Link to="/">
      <img src="/logo.svg" className={s.logo} />
    </Link>
  </div>
)

export default withStyles(styles)(Footer)
