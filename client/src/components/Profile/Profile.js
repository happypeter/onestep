import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CourseList from '../../components/CourseList'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
    maxWidth: MAX_WIDTH,
    margin: '0 auto'
  },
  section: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  notice: {
    padding: theme.spacing.unit * 2,
    fontSize: 16
  }
})

const Profile = ({ classes: s, currentUser, paidCourses, courses, isVip }) => {
  const matchedCourses = courses.filter(c =>
    paidCourses.includes(c.link.slice(1))
  )
  const pageContent = (
    <div className={s.root}>
      <div className={s.section}>
        {currentUser && currentUser.userName ? (
          <div>用户名: {currentUser.userName}</div>
        ) : null}

        {currentUser && currentUser.phoneNum ? (
          <div>手机号: {currentUser.phoneNum}</div>
        ) : null}

        {currentUser && currentUser.coin ? (
          <div>饺子数量: {currentUser.coin}</div>
        ) : null}
      </div>
      {isVip && (
        <div className={s.notice}>
          好奇猫老用户，感谢您之前购买过好奇猫上的课程，因为网站改版，造成您之前的账号不能访问，为了表示歉意，给您开通VIP权限，您可以观看目前好奇猫上发布的所有付费课程
        </div>
      )}
      {paidCourses.length > 0 ? (
        <CourseList courses={matchedCourses} title="已购买的课程" />
      ) : null}
    </div>
  )

  return <div className={s.root}>{pageContent}</div>
}

export default withStyles(styles)(Profile)
