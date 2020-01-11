import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: '#ececec',
    padding: theme.spacing.unit * 6,
    width: '100%',
    textAlign: 'center'
  },
  link: {
    color: '#00bcd4',
    textDecoration: 'none'
  }
})

const Footer = ({ classes: s }) => (
  <div className={s.root}>
    <a href="http://www.beian.miit.gov.cn/" className={s.link}>
      冀ICP备15007992号-3
    </a>
  </div>
)

export default withStyles(styles)(Footer)
