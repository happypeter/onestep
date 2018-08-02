import React, { Component } from 'react'
import EpisodeDoc from './EpisodeDoc'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { withRouteData, Link } from 'react-static'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  }
})

class Episode extends Component {
  componentDidMount() {
    const { fetchEpisode, post, isMember } = this.props
    if (isMember) {
      fetchEpisode({ link: post.link })
    }
  }

  componentDidUpdate(prevProps) {
    const { post, fetchEpisode, isMember } = this.props
    if (isMember && isMember !== prevProps.isMember) {
      fetchEpisode({ link: post.link })
    }
  }

  render() {
    const { markdown, classes: s, isMember } = this.props
    return (
      <div className={s.root}>
        <div>
          <Link to="/coin">{'<'} Back</Link>
        </div>
        <div>
          {isMember ? <EpisodeDoc doc={markdown} /> : <div>请购买后阅读</div>}
        </div>
      </div>
    )
  }
}

const WrapperEpisode = compose(
  withStyles(styles),
  withWidth()
)(Episode)

export default withRouteData(WrapperEpisode)
