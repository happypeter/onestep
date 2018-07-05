import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.light} `
  },
  icon: {
    fill: theme.palette.primary.main
  }
})

const BindPhoneNote = ({ classes: s }) => (
  <div className={s.root}>
    <PersonIcon className={s.icon} />
    <Typography>
      由于网站升级，所有用户都需要先到
      <Link to="/signup">注册页面</Link>
      上绑定手机并设置新的密码。老用户注意一定要用自己原来的用户名注册，这样以前购买过的课程会依旧可以观看
    </Typography>
  </div>
)

export default withStyles(styles)(BindPhoneNote)
