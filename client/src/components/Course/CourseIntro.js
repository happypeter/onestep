import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FaceIcon from '@material-ui/icons/Face'
import ListIcon from '@material-ui/icons/List'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {},
  section: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    width: '49%',
    padding: theme.spacing.unit * 2
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit
  },
  sectionWrapper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    border: '1px solid red',
    backgroundColor: '#ddd',
    backgroundImage: `linear-gradient()`
  }
})

class CourseIntro extends React.Component {
  render() {
    const { courseIntro, classes: s } = this.props
    const { intro, learningGoal, writingToWho, title } = courseIntro

    return (
      <div className={s.root}>
        <Typography variant="headline">{title}</Typography>
        <Typography variant="caption">{intro}</Typography>
        <div className={s.sectionWrapper}>
          <Paper className={s.section}>
            <Typography variant="caption">{learningGoal}</Typography>
            <FaceIcon />
            <Typography className={s.sectionTitle} variant="title">
              适合观众
            </Typography>
          </Paper>
          <Paper className={s.section}>
            <Typography variant="caption">{writingToWho}</Typography>
            <ListIcon />
            <Typography className={s.sectionTitle} variant="title">
              知识点
            </Typography>
          </Paper>
        </div>
      </div>
    )
  }
}

CourseIntro.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CourseIntro)
