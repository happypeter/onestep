import React, { Component } from 'react'
import CourseCard from '../common/CourseCard'
import MemberShip from './MemberShip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3
  },
  section: {
    padding: theme.spacing.unit
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  }
})

class Profile extends Component {
  componentDidMount() {
    this.props.fetchCoursesIfNeeded()
  }

  render() {
    const { courses, anyCourse, isMember, goto, classes: s } = this.props
    const pageContent = (
      <div className={s.root}>
        <Paper className={s.section}>
          <div className={s.sectionTitle}>
            <Typography variant="headline">购买的课程</Typography>
          </div>
          <div>
            {anyCourse ? (
              courses.map(course => (
                <CourseCard
                  key={course.uid}
                  uid={course.uid}
                  title={course.title}
                  goto={goto}
                />
              ))
            ) : (
              <div>还没有购买过课程</div>
            )}
          </div>
        </Paper>
        <Paper>
          <div className={s.sectionTitle}>
            <Typography variant="headline">会员服务</Typography>
          </div>
          <MemberShip isMember={isMember} />
        </Paper>
      </div>
    )

    return <div>{pageContent}</div>
  }
}

export default withStyles(styles)(Profile)
