import React, { Component } from 'react'
import CourseCard from '../common/CourseCard'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    width: '100%',
    margin: '32px auto'
  },
  section: {
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center'
  }
})

const CourseList = ({ classes: s, courses, title }) => {
  const courseList = courses.map(item => (
    <CourseCard course={item} key={item.link} />
  ))

  return (
    <div className={s.root}>
      <div className={s.section}>
        <Typography variant="h5">{title}</Typography>
      </div>

      <Grid container spacing={32}>
        {courseList}
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CourseList)
