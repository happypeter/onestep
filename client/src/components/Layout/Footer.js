import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const Footer = () => (
  <div
    style={{
      backgroundColor: '#ececec',
      padding: 48,
      width: '100%',
      textAlign: 'center'
    }}
  >
    <a
      href="http://www.beian.miit.gov.cn/"
      style={{ color: '#00bcd4', textDecoration: 'none' }}
    >
      冀ICP备15007992号-3
    </a>
  </div>
)

export default withStyles(styles)(Footer)
