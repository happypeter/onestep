import React, { Component } from 'react'
import EpisodeDoc from './EpisodeDoc'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { withRouteData, Link } from 'react-static'
import { MAX_WIDTH } from '../../constants/GlobalStyle'
import { videoJsOptions } from '../../lib/playerConfig'
import { videoRepo } from '../../config/config'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 32
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
    const { markdown, classes: s, isMember, post } = this.props
    return (
      <div className={s.root}>
        <div>
          {isMember ? (
            <div>
              <div className={s.title}>{post.title}</div>
              {/* <VideoPlayer
                {...videoJsOptions(`${videoRepo}/coin/${post.link}.mp4`)}
              /> */}
              <EpisodeDoc doc={markdown} />
            </div>
          ) : (
            <div>请购买后阅读</div>
          )}
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
