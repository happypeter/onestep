import React from 'react'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import withWidth from '@material-ui/core/withWidth'
import EpisodeDoc from './EpisodeDoc'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    width: 1000,
    margin: '0 auto',
    padding: theme.spacing.unit * 3
  },
  player: {
    padding: theme.spacing.unit * 3
  },
  videoMeta: {
    paddingTop: theme.spacing.unit * 3
  }
})

class Episode extends React.Component {
  componentDidMount() {
    const { width, openSidebar } = this.props
    if (width === 'lg' || width === 'xl') {
      openSidebar()
    }
    this.props.setOnEpisodePage()
    const { courseName } = this.props.match.params
    this.props.fetchCourse(courseName)
  }

  componentWillUnmount() {
    this.props.clearOnEpisodePage()
  }

  render() {
    const {
      videoJsOptions,
      episodeItem: { markdown },
      classes: s,
      episodeTitle
    } = this.props

    return (
      <div>
        <div className={s.root}>
          <Paper className={s.player}>
            <VideoPlayer {...videoJsOptions} />
            <Paper elevation={0} className={s.videoMeta}>
              <Typography variant="headline">{episodeTitle}</Typography>
            </Paper>
          </Paper>
          <EpisodeDoc doc={markdown} />
        </div>
      </div>
    )
  }
}

Episode.propTypes = {
  episodeItem: PropTypes.object.isRequired,
  clearOnEpisodePage: PropTypes.func.isRequired,
  setOnEpisodePage: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  episodeTitle: PropTypes.string.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(Episode)
