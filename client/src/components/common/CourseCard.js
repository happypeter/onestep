import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-static'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  date: {
    textAlign: 'center',
    backgroundColor: '#cdcdcd',
    padding: ' 2px 0',
    width: 74,
    color: '#fff',
    fontSize: 12,
    margin: '8px auto',
    borderRadius: 2
  },
  link: {
    display: 'block',
    textDecoration: 'none'
  },
  card: {
    padding: 10,
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.07)`
  },
  action: {
    width: '100%'
  },
  media: {
    objectFit: 'cover'
  },
  title: {
    marginTop: 10,
    textAlign: 'right'
  }
})

const CourseCard = ({ classes: s, course }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={4}>
      <div className={s.date}>{course.date}</div>
      <Link to={course.link} className={s.link}>
        <Card className={s.card}>
          <CardActionArea className={s.action}>
            <CardMedia
              image={course.cover}
              className={s.media}
              component="img"
              title={course.id}
            />
            <div className={s.title}>
              <Typography>{course.title}</Typography>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  )
}

export default withStyles(styles)(CourseCard)
