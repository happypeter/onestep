import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEpisode, fetchCourse } from '../redux/actions/contentAction'
import { setOnEpisodePage, clearOnEpisodePage } from '../redux/actions'

import { getEpisode } from '../redux/selectors/commonSelectors.js'

import { videoRepo } from '../config/config'
import Episode from '../components/Episode/Episode'

const getVLink = (courseUid, epUid) => `${videoRepo}/${courseUid}/${epUid}.mp4`

class EpisodeContainer extends Component {
  componentDidMount() {
    const { courseName, episodeName } = this.props.match.params
    this.props.fetchEpisode({ courseName, episodeName })
    this.props.fetchCourse({ courseName })
  }

  componentWillReceiveProps() {
    const { history, location, fetchEpisode } = this.props
    if (history.location !== location) {
      let params = history.location.pathname.split('/')
      const [, courseName, episodeName] = params
      fetchEpisode({ courseName, episodeName })
    }
  }

  render() {
    const { item } = this.props.episode

    const { episodeName, courseName } = this.props.match.params
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
        episodeName={episodeName}
        episodes={this.props.episodes}
        videoJsOptions={EpisodeVideoJsOptions}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state)
})

export default connect(
  mapStateToProps,
  {
    fetchEpisode,
    fetchCourse,
    setOnEpisodePage,
    clearOnEpisodePage
  }
)(EpisodeContainer)
