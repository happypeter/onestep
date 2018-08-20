import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CourseList from '../../containers/CourseListContainer'
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
  }
})

class Profile extends Component {
  render() {
    const { isMember, classes: s, currentUser } = this.props
    const courses = [{ uid: 'coin', title: '一币一别墅' }]
    const pageContent = (
      <div className={s.root}>
        <div className={s.section}>
          <div>
            UID: {currentUser && currentUser.uid ? currentUser.uid : ''}
          </div>
          <div>饺子数量: {isMember ? currentUser.coin : 0}</div>
        </div>
        {isMember ? (
          <CourseList courses={courses} title="已购买的课程" />
        ) : null}
      </div>
    )

    return <div className={s.root}>{pageContent}</div>
  }
}

export default withStyles(styles)(Profile)
