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
  getCurrentEpisodeTitle,
  getEpisodeVideoLink,
  getEpisodeMarkdown
} from '../redux/selectors/commonSelectors.js'

import Episode from '../components/Episode/Episode'

class EpisodeContainer extends Component {
  componentWillReceiveProps() {
    const { history, location, fetchEpisode } = this.props
    if (history.location !== location) {
      let params = history.location.pathname.split('/')
      const [, courseUid, episodeUid] = params
      fetchEpisode({ courseUid, episodeUid })
    }
  }

  render() {
    const { item } = this.props.episode

    const { episodeUid, courseUid } = this.props.match.params
    return (
      <Episode
        episodeItem={item}
        courseUid={courseUid}
        episodeUid={episodeUid}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state),
  episodeTitle: getCurrentEpisodeTitle(state),
  videoLink: getEpisodeVideoLink(state),
  markdown: getEpisodeMarkdown(state)
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
