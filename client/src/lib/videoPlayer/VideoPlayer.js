import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './videojs-hqcat.css'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      // console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  handleSpaceKeyDown = event => {
    if (event.which === 32) {
      event.preventDefault()
      if (this.player) {
        switch (this.player.state.state) {
          case 'playing':
            this.player.pause()
            break
          case 'pause':
            this.player.play()
            break
          default:
            return
        }
      } else {
        console.log('error')
      }
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // write a plugin
    var that = this
    const setStateandFocusPlugin = function(options) {
      this.on('play', function(e) {
        this.setState({
          state: 'playing'
        })
      })

      this.on('pause', function(e) {
        this.setState({
          state: 'pause'
        })
      })

      this.on('timeupdate', function(e) {
        that.refs.videoPlayerRef.focus()
      })

      this.on('ended', function(e) {
        // some code to navigate to next episode page
      })
    }

    // Registering A Plugin
    videojs.registerPlugin('setStateandFocusPlugin', setStateandFocusPlugin)

    return (
      <div
        data-vjs-player
        onKeyDown={this.handleSpaceKeyDown}
        ref="videoPlayerRef"
      >
        <video
          ref={node => (this.videoNode = node)}
          className="video-js vjs-hqcat"
        />
      </div>
    )
  }
}
