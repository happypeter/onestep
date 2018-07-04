import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { videoRepo } from '../../config/config'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const getCoverLink = uid => `${videoRepo}/posters/${uid}.png`

const styles = {
  card: {
    cursor: 'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}

class CourseCard extends React.Component {
  render() {
    const { uid, title, classes: s, goto } = this.props
    return (
      <Card onClick={() => goto(`/${uid}`)} className={s.card}>
        <CardMedia image={getCoverLink(uid)} className={s.media} />
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </Card>
    )
  }
}

CourseCard.propTypes = {
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(CourseCard)
