import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './videojs-hqcat.css'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props)
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
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
