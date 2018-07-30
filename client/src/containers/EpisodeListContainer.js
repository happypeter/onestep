import React from 'react'
import EpisodeList from '../components/Course/EpisodeList'
import { connect } from 'react-redux'
import { goto } from '../redux/actions'
import { getIsMember } from '../redux/selectors/commonSelectors.js'

const EpisodeListContainer = props => <EpisodeList {...props} />

const mapStateToProps = state => ({
  isMember: getIsMember(state)
})

export default connect(
  mapStateToProps,
  { goto }
)(EpisodeListContainer)
