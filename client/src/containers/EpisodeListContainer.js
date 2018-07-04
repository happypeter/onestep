import React from 'react'
import EpisodeList from '../components/Course/EpisodeList'
import { connect } from 'react-redux'
import { getEpisodes } from '../redux/selectors/commonSelectors'

const EpisodeListContainer = props => <EpisodeList {...props} />

const mapStateToProps = state => ({
  episodes: getEpisodes(state)
})

export default connect(mapStateToProps)(EpisodeListContainer)
