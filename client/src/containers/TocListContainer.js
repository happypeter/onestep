import React from 'react'
import TocList from '../components/TocList'
import { connect } from 'react-redux'
import { toggleSidebar, goto } from '../redux/actions'
import {
  getCourseTocContent,
  getCurrentCourseUid
} from '../redux/selectors/commonSelectors.js'

const TocListContainer = props => <TocList {...props} />

const mapStateToProps = state => ({
  episodes: getCourseTocContent(state),
  currentCourseUid: getCurrentCourseUid(state)
})
export default connect(
  mapStateToProps,
  { toggleSidebar, goto }
)(TocListContainer)
