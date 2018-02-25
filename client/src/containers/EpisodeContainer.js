import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEpisode } from '../redux/actions/contentAction'
import { getEpisode } from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncEpisode = Loadable({
  loader: () => import('../components/Episode/Episode'),
  loading: LoadingComponent,
  delay: 300
})

class EpisodeContainer extends Component {
  componentDidMount() {
    const { courseName, episodeName } = this.props.match.params
    this.props.fetchEpisode({ courseName, episodeName })
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
          src: `${item.vlink}/${episodeName}.mp4`,
          type: 'video/mp4'
        }
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      },
      // Using A Plugin
      plugins: {
        setStateandFocusPlugin: true
      }
    }

    return (
      <AsyncEpisode
        episodeState={item}
        courseName={courseName}
        episodeName={episodeName}
        videoJsOptions={EpisodeVideoJsOptions}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state)
})

export default connect(mapStateToProps, { fetchEpisode })(EpisodeContainer)
