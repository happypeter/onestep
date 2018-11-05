import React from 'react'
import { connect } from 'react-redux'
import { withRouteData } from 'react-static'
import { fetchEpisode } from '../redux/actions/contentAction'
import Episode from '../components/Episode/Episode'
import {
  getEpisodeMarkdown,
  getPaidCourses,
  getIsAuthenticated
} from '../redux/selectors/commonSelectors'

const EpisodeContainer = props => {
  return <Episode {...props} />
}

const mapStateToProps = state => ({
  markdown: getEpisodeMarkdown(state),
  paidCourses: getPaidCourses(state),
  isAuthenticated: getIsAuthenticated(state)
})

export default connect(
  mapStateToProps,
  {
    fetchEpisode
  }
)(withRouteData(EpisodeContainer))
