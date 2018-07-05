import React, { Component } from 'react'
import MemberShip from './MemberShip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    maxWidth: 400,
    margin: '0 auto'
  },
  section: {
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  sectionTitle: {
    border: `2px solid ${theme.palette.primary.light}`,
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
    const courseList = courses => (
      <List>
        {courses.map(c => (
          <ListItem key={c.uid} button onClick={() => goto(`/${c.uid}`)}>
            <ListItemText>{c.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    )

    const pageContent = (
      <div className={s.root}>
        <Paper className={s.section}>
          <div className={s.sectionTitle}>
            <Typography variant="headline">购买的课程</Typography>
          </div>
          <div>
            {anyCourse ? courseList(courses) : <div>还没有购买过课程</div>}
          </div>
        </Paper>
        <Paper className={s.section}>
          <div className={s.sectionTitle}>
            <Typography variant="headline">会员服务</Typography>
          </div>
          <MemberShip isMember={isMember} />
        </Paper>
      </div>
    )

    return <div className={s.root}>{pageContent}</div>
  }
}

export default withStyles(styles)(Profile)
