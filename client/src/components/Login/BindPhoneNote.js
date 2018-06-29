import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 20
  }
})

const BindPhoneNote = ({ classes: s }) => (
  <div className={s.root}>
    网站升级，请先到
    <Link to="/signup">注册页面</Link>
    上绑定手机并设置新的密码
  </div>
)

export default withStyles(styles)(BindPhoneNote)
