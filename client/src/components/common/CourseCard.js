import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-static'

const styles = theme => ({
  link: {
    display: 'block',
    textDecoration: 'none'
  },
  card: {
    cursor: 'pointer',
    margin: theme.spacing.unit * 2
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    borderBottom: '1px solid #ececec'
  }
})

const CourseCard = ({ classes: s, course }) => {
  return (
    <Link to={course.link} className={s.link}>
      <Card className={s.card}>
        <CardMedia image={course.cover} className={s.media} />
        <CardContent>
          <Typography>{course.title}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default withStyles(styles)(CourseCard)
