import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-static'
import Grid from '@material-ui/core/Grid'
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined'

const styles = theme => ({
  link: {
    display: 'block',
    textDecoration: 'none'
  },
  card: {
    padding: 14,
    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.07)`
  },
  action: {
    width: '100%'
  },
  media: {
    objectFit: 'cover'
  },
  title: {
    marginTop: 14,
    textAlign: 'right',
    color: '#aaa',
    fontSize: 14
  },
  date: {
    marginTop: 10,
    marginLeft: 14,
    color: '#aaa',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 'unset',
    marginRight: 4
  }
})

const CourseCard = ({ classes: s, course }) => {
  return (
    <Grid item xs={12} sm={6} lg={4} xl={4}>
      <Link to={course.link} className={s.link}>
        <Card className={s.card}>
          <CardActionArea className={s.action}>
            <CardMedia
              image={course.cover}
              className={s.media}
              component="img"
              title={course.id}
            />
            <div className={s.title}>{course.title}</div>
          </CardActionArea>
        </Card>
      </Link>
      <div className={s.date}>
        <CalendarTodayOutlined className={s.icon} />
        <div>{course.date}</div>
      </div>
    </Grid>
  )
}

export default withStyles(styles)(CourseCard)
