import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: 350,
    margin: '20px auto',
    padding: theme.spacing.unit * 2,
    '& img': {
      width: '100%'
    }
  },
  title: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class Cart extends React.Component {
  render() {
    const { price, courseName, uid, classes: s } = this.props
    const details = (
      <div>
        <img alt="weixin" src="/weixin.jpg" />

        <Typography className={s.title} variant="headline">
          {price}元购买《{courseName}》
        </Typography>

        <Typography variant="caption">
          请添加 Peter 的微信进行微信付款即可，请把您在本站的
          <Link to="/signup">注册</Link>用户名，以及本课程的代号 {uid}
          发送给他。
        </Typography>
      </div>
    )

    const pickCourse = (
      <div>
        <Link to="/">请到首页挑选</Link>要购买的课程
      </div>
    )
    const content = !courseName ? pickCourse : details
    return <Paper className={s.root}>{content}</Paper>
  }
}

export default withStyles(styles)(Cart)
