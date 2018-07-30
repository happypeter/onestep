import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-static'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
    maxWidth: 400,
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

    const pageContent = (
      <div className={s.root}>
        <Paper className={s.section}>
          <div>饺子数量: {isMember ? currentUser.coin : 0}</div>
        </Paper>
        <Link to="/coin">查看课程</Link>
      </div>
    )

    return <div className={s.root}>{pageContent}</div>
  }
}

export default withStyles(styles)(Profile)
