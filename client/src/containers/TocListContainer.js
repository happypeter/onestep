import React from 'react'
import TocList from '../components/TocList'
import { connect } from 'react-redux'
import { toggleSidebar } from '../redux/actions'
import { getCourseTocContent } from '../redux/selectors/commonSelectors.js'

const TocListContainer = props => <TocList {...props} />

const mapStateToProps = state => ({
  episodes: getCourseTocContent(state)
})
export default connect(
  mapStateToProps,
  { toggleSidebar }
)(TocListContainer)
