import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import EpisodeList from '../../containers/EpisodeListContainer'
import { withRouteData } from 'react-static'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  },
  content: {
    paddingBottom: 32
  },
  section: {}
})

class Course extends Component {
  render() {
    const { classes: s, posts } = this.props

    return (
      <div className={s.root}>
        <Paper className={s.content}>
          <div className={s.section}>
            <EpisodeList posts={posts} />
          </div>
        </Paper>
      </div>
    )
  }
}

export default withRouteData(withStyles(styles)(Course))
