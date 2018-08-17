import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouteData } from 'react-static'
import EpisodeList from '../../containers/EpisodeListContainer'
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
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 24
  }
})

class Course extends Component {
  render() {
    const { classes: s, posts } = this.props
    return (
      <div className={s.root}>
        <div className={s.title}>一币一别墅</div>
        <EpisodeList posts={posts} />
      </div>
    )
  }
}

export default withRouteData(withStyles(styles)(Course))
