import React from 'react'
import TocList from '../components/TocList'
import { connect } from 'react-redux'
import { toggleSidebar } from '../redux/actions'

const TocListContainer = props => <TocList {...props} />

export default connect(
  null,
  { toggleSidebar }
)(TocListContainer)
