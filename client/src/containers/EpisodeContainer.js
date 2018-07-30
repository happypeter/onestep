import React from 'react'
import { connect } from 'react-redux'
import { fetchEpisode } from '../redux/actions/contentAction'
import Episode from '../components/Episode/Episode'
import {
  getEpisodeMarkdown,
  getIsMember
} from '../redux/selectors/commonSelectors'
import { goto } from '../redux/actions'

const EpisodeContainer = props => {
  if (!props.isMember) {
    props.history.push('/course')
    return null
  }
  return <Episode {...props} />
}

const mapStateToProps = state => ({
  markdown: getEpisodeMarkdown(state),
  isMember: getIsMember(state)
})

export default connect(
  mapStateToProps,
  {
    goto,
    fetchEpisode
  }
)(EpisodeContainer)
