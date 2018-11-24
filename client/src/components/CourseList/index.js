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
  list: {
    border: '1px solid red'
  },
  section: {
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center'
  }
})

const CourseList = ({ classes: s, courses, title }) => {
  const courseList = courses.map(item => (
    <Grid key={item.link} item xs={12} sm={6} lg={4} xl={4}>
      <CourseCard course={item} />
    </Grid>
  ))

  return (
    <div className={s.root}>
      <div className={s.section}>
        <Typography variant="h5">{title}</Typography>
      </div>

      <Grid container>{courseList}</Grid>
    </div>
  )
}

export default withStyles(styles)(CourseList)
