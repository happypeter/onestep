import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { videoRepo } from '../../config/config'

const getCoverLink = uid => `${videoRepo}/posters/${uid}.png`

const styles = theme => ({
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

class CourseCard extends React.Component {
  render() {
    const { course, classes: s, goto } = this.props
    return (
      <Card onClick={() => goto(`${course.link}`)} className={s.card}>
        <CardMedia image={course.cover} className={s.media} />
        <CardContent>
          <Typography>{course.title}</Typography>
        </CardContent>
      </Card>
    )
  }
}

CourseCard.propTypes = {
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(CourseCard)
