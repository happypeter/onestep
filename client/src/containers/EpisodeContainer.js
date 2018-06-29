import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEpisode, fetchCourse } from '../redux/actions/contentAction'

import {
  getEpisode,
  getCourseTocContent
} from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncEpisode = Loadable({
  loader: () => import('../components/Episode/Episode'),
  loading: LoadingComponent,
  delay: 300
})

const getVLink = (courseUid, epUid) =>
  `https://haoqicat-1253322599.costj.myqcloud.com/${courseUid}/${epUid}.mp4`

class EpisodeContainer extends Component {
  componentDidMount() {
    const { courseName, episodeName } = this.props.match.params
    this.props.fetchEpisode({ courseName, episodeName })
    this.props.fetchCourse({ courseName })
  }

  componentWillReceiveProps() {
    const { history, location, fetchEpisode } = this.props
    if (history.location !== location) {
      let params = history.location.pathname.split('/')
      const [, courseName, episodeName] = params
      fetchEpisode({ courseName, episodeName })
    }
  }

  render() {
    const { isFetching, item } = this.props.episode
    if (isFetching) return <LoadingComponent />

    const { episodeName, courseName } = this.props.match.params
    // VideoJsOptions for this Course

    const EpisodeVideoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: getVLink(item.courseUid, item.uid),
          type: 'video/mp4'
        }
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      }
    }

    return (
      <AsyncEpisode
        episodeItem={item}
        courseName={courseName}
        episodeName={episodeName}
        episodes={this.props.episodes}
        videoJsOptions={EpisodeVideoJsOptions}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state),
  episodes: getCourseTocContent(state)
})

export default connect(
  mapStateToProps,
  {
    fetchEpisode,
    fetchCourse
  }
)(EpisodeContainer)
