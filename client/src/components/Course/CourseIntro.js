import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import PropTypes from 'prop-types'

const styles = theme => ({
  root: {},
  section: {
    marginTop: theme.spacing.unit * 2
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit
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
        <div className={s.section}>
          <Typography className={s.sectionTitle} variant="title">
            适合观众
          </Typography>
          <Typography variant="caption">{learningGoal}</Typography>
        </div>
        <div className={s.section}>
          <Typography className={s.sectionTitle} variant="title">
            知识点
          </Typography>
          <Typography variant="caption">{writingToWho}</Typography>
        </div>
      </div>
    )
  }
}

CourseIntro.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CourseIntro)
