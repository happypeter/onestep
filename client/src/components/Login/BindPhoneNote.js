import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import NotificationIcon from '@material-ui/icons/NotificationsActive'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    fill: theme.palette.primary.main
  }
})

const BindPhoneNote = ({ classes: s }) => (
  <div className={s.root}>
    <NotificationIcon className={s.icon} />
    <Typography>
      Hey..网站升级啦，所以老用户也需要先到
      <Link to="/signup">注册页面</Link>
      上绑定手机并设置新的密码，注意一定要用自己原来的用户名注册，这样以前购买过的课程才会依旧保有观看权限哦。
    </Typography>
  </div>
)

export default withStyles(styles)(BindPhoneNote)
