import React, {Component} from 'react'
import {Redirect, matchPath} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchEpisode} from '../redux/actions/contentAction'
import {getEpisode} from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncEpisode = Loadable({
  loader: () => import('../components/Episode/Episode'),
  loading: LoadingComponent,
  delay: 300,
})

class EpisodeContainer extends Component {
  componentDidMount() {
    const {courseName, episodeName} = this.props.match.params
    this.props.fetchEpisode({courseName, episodeName})
  }

  componentWillReceiveProps() {
    if (this.props.history.location !== this.props.location) {
      let params = this.props.history.location.pathname.split('/')
      const [ , courseName, episodeName] = params
      this.props.fetchEpisode({courseName, episodeName})
    }
  }

  render() {
    const {episode, match: {params: {episodeName}}} = this.props
    const {isFetching, item} = this.props.episode
    // 404: /path/whatever
    const match = matchPath(this.props.location.pathname, {
      path: this.props.match.path,
    })
    if (!match.isExact) {
      return <Redirect to={{pathname: '/404'}} />
    }
    if (isFetching) return <LoadingComponent />

    const {courseName} = this.props.match.params
    // VideoJsOptions for this Course
    const EpisodeVideoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [
        {
          src: `${item.vlink}/${episodeName}.mp4`,
          type: 'video/mp4',
        },
      ],
      fluid: 'true', // put the player in the VideoPlayerWrap box
      playbackRates: [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false, // vertical VolumeControl
        },
      },
      // Using A Plugin
      plugins: {
        setStateandFocusPlugin: true,
      },
    }

    return (
      <AsyncEpisode
        episodeState={item}
        courseName={courseName}
        videoJsOptions={EpisodeVideoJsOptions}
      />
    )
  }
}

const mapStateToProps = state => ({
  episode: getEpisode(state),
})

export default connect(mapStateToProps, {fetchEpisode})(EpisodeContainer)
