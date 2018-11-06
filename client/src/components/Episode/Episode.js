import React, { Component } from 'react'
import EpisodeDoc from './EpisodeDoc'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { withRouteData } from 'react-static'
import { videoJsOptions } from '../../lib/playerConfig'
import { videoRepo } from '../../config/config'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: 680,
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
  render() {
    const {
      markdown,
      classes: s,
      isAuthenticated,
      paidCourses,
      post,
      price,
      cid
    } = this.props
    const isAccessible =
      (price && price === '0') || (isAuthenticated && paidCourses.includes(cid))
    return (
      <div className={s.root}>
        <div>
          {isAccessible ? (
            <div>
              <div className={s.title}>{post.title}</div>
              <VideoPlayer
                {...videoJsOptions(`${videoRepo}/${cid}/${post.link}.mp4`)}
              />
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
