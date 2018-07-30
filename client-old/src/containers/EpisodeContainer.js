import React from 'react'
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
  getCurrentEpisodeTitle,
  getEpisodeVideoLink,
  getEpisodeMarkdown
} from '../redux/selectors/commonSelectors.js'

import Episode from '../components/Episode/Episode'

const EpisodeContainer = props => <Episode {...props} />

const mapStateToProps = state => ({
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
