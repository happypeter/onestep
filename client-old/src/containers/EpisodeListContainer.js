import React from 'react'
import EpisodeList from '../components/Course/EpisodeList'
import { connect } from 'react-redux'
import {
  getEpisodes,
  getCurrentCourseUid
} from '../redux/selectors/commonSelectors'
import { goto } from '../redux/actions'

const EpisodeListContainer = props => <EpisodeList {...props} />

const mapStateToProps = state => ({
  episodes: getEpisodes(state),
  courseUid: getCurrentCourseUid(state)
})

export default connect(
  mapStateToProps,
  { goto }
)(EpisodeListContainer)
