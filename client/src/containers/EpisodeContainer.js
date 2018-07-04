import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchEpisode,
  fetchCurrentCourse
} from '../redux/actions/contentAction'
import {
  setOnEpisodePage,
  clearOnEpisodePage,
  openDrawer
} from '../redux/actions'

import {
  getEpisode,
  getCurrentEpisodeTitle
} from '../redux/selectors/commonSelectors.js'

import { videoRepo } from '../config/config'
import Episode from '../components/Episode/Episode'

const getVLink = (courseUid, epUid) => `${videoRepo}/${courseUid}/${epUid}.mp4`

class EpisodeContainer extends Component {
  componentDidMount() {
    const { courseName, episodeUid } = this.props.match.params
    this.props.fetchEpisode({ courseName, episodeUid })
    this.props.fetchCurrentCourse(courseName)
  }

  componentWillReceiveProps() {
    const { history, location, fetchEpisode } = this.props
    if (history.location !== location) {
      let params = history.location.pathname.split('/')
      const [, courseName, episodeUid] = params
      fetchEpisode({ courseName, episodeUid })
    }
  }

  render() {
    const { item } = this.props.episode

    const { episodeUid, courseName } = this.props.match.params

    // VideoJsOptions for this Course
    const EpisodeVideoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: getVLink(item.courseUid, item.uid),
          type: 'video/mp4'
        }
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      }
    }

    return (
      <Episode
        episodeItem={item}
        courseName={courseName}
        episodeUid={episodeUid}
        videoJsOptions={EpisodeVideoJsOptions}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state),
  episodeTitle: getCurrentEpisodeTitle(state)
})

export default connect(
  mapStateToProps,
  {
    fetchEpisode,
    fetchCurrentCourse,
    setOnEpisodePage,
    clearOnEpisodePage,
    openDrawer
  }
)(EpisodeContainer)
