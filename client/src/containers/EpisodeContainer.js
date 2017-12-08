import React, { Component } from 'react'
import {
  Redirect,
  matchPath
} from 'react-router-dom'
import { connect } from 'react-redux'
// import Episode from '../components/Episode/Episode'
import { fetchEpisode } from '../redux/actions/contentAction'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncEpisode = Loadable({
  loader: () => import('../components/Episode/Episode'),
  loading: LoadingComponent,
  delay: 300
})

class EpisodeContainer extends Component {

  componentWillMount () {
    let { courseName, episodeName } = this.props.match.params
    this.props.fetchEpisode({ courseName, episodeName })
  }

  render () {
    // console.log(this.props);
    let {
      episode: { status },
      match: { params: { episodeName } }
        } = this.props

    // 404: /path/whatever
    const match = matchPath(this.props.location.pathname, {
      path: this.props.match.path
    })
    if (!match.isExact) {
      return <Redirect to={{ pathname: '/404' }} />
    }

    switch (status) {
      case 'LOADING': {
        return (<LoadingComponent />)
      }
      case 'SUCCESS': {
        const episodeState = this.props.episode
        // VideoJsOptions for this Course
        const EpisodeVideoJsOptions = {
          autoplay: false,
          controls: true,
          sources: [{
            src: `${episodeState.vlink}/${episodeName}.mp4`,
            type: 'video/mp4'
          }],
          poster: 'http://videojs.com/img/logo.png',
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
          <div>
            <AsyncEpisode
              episodeState={episodeState}
              videoJsOptions={EpisodeVideoJsOptions}
            />
          </div>
        )
      }
      case 'FAILURE': {
        return (
          <div>
            <div>信息加载失败</div>
          </div>
        )
      }
      default: {
        throw new Error('unexpected status ' + status)
      }
    }
  }
}

const mapStateToProps = (state) => ({
  episode: state.episode
})

export default connect(mapStateToProps, { fetchEpisode })(EpisodeContainer)
