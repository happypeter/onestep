import React from 'react'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import withWidth from '@material-ui/core/withWidth'
import EpisodeDoc from './EpisodeDoc'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    border: '2px solid red',
    width: 1000,
    margin: '0 auto'
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
          <VideoPlayer {...videoJsOptions} />
          <Typography variant="headline">{episodeTitle}</Typography>
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
