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
  const { isAuthenticated, paidCourses, cid, price } = props
  const isAccessible =
    (price && price === '0') || (isAuthenticated && paidCourses.includes(cid))

  if (!isAccessible) {
    props.history.push('/')
    return null
  }

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
