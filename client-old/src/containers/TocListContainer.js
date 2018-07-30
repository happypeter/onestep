import React from 'react'
import TocList from '../components/Layout/TocList'
import { connect } from 'react-redux'
import { toggleDrawer, goto } from '../redux/actions'
import {
  getCourseTocContent,
  getCurrentCourseUid,
  getCurrentEpisodeUid,
  getCurrentCourseName,
  getIsOnEpisodePage
} from '../redux/selectors/commonSelectors.js'

const TocListContainer = props => <TocList {...props} />

const mapStateToProps = state => ({
  episodes: getCourseTocContent(state),
  currentCourseUid: getCurrentCourseUid(state),
  currentEpisodeUid: getCurrentEpisodeUid(state),
  currentCourseName: getCurrentCourseName(state),
  isOnEpisodePage: getIsOnEpisodePage(state)
})
export default connect(
  mapStateToProps,
  { toggleDrawer, goto }
)(TocListContainer)
