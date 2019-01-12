import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Typography } from '@material-ui/core'
import CourseList from '../../components/CourseList'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
    maxWidth: MAX_WIDTH,
    margin: '0 auto'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 8,
    fontFamily: 'sans-serif'
  },
  title: {
    fontSize: 22,
    fontWeight: 600
  },
  profile: {
    padding: 32,
    backgroundColor: '#fff',
    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.07)`
  },
  row: {
    borderTop: '1px solid #f1f1f1',
    padding: '16px 0',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },
  col: {
    width: 128,
    fontWeight: 500
  },
  col1: {
    fontSize: '18px',
    color: '#909090'
  },
  vip: {
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 2,
    fontSize: 12,
    fontWeight: 500,
    width: 32,
    height: 18,
    lineHeight: '18px',
    color: '#fff',
    backgroundColor: '#00bcd4'
  },
  cTitle: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 48,
    fontFamily: 'sans-serif'
  }
})

const Profile = ({ classes: s, currentUser, paidCourses, courses, isVip }) => {
  const matchedCourses = courses.filter(c =>
    paidCourses.includes(c.link.slice(1))
  )
  const pageContent = (
    <div className={s.root}>
      <div className={s.profile}>
        <div className={s.titleWrapper}>
          <div className={s.title}>个人资料</div>
          {isVip && <div className={s.vip}>VIP</div>}
        </div>

        {currentUser && currentUser.userName ? (
          <div className={s.row}>
            <div className={s.col}>用户名</div>
            <div className={s.col1}>{currentUser.userName}</div>
          </div>
        ) : null}

        {currentUser && currentUser.phoneNum ? (
          <div className={s.row}>
            <div className={s.col}>手机号</div>
            <div className={s.col1}>{currentUser.phoneNum}</div>
          </div>
        ) : null}

        {currentUser && currentUser.coin ? (
          <div className={s.row}>
            <div className={s.col}>饺子数量</div>
            <div className={s.col1}>{currentUser.coin}</div>
          </div>
        ) : null}
      </div>

      {paidCourses.length > 0 ? (
        <div>
          <div className={s.cTitle}>已购买的课程</div>
          <CourseList courses={matchedCourses} />
        </div>
      ) : null}
    </div>
  )

  return <div className={s.root}>{pageContent}</div>
}

export default withStyles(styles)(Profile)
