import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './videojs-hqcat.css'

// 没有下面的 updateCount 相关的代码
// 每次切换新视频的时候，vidoejs 就不能加载新视频
// 参考： https://github.com/videojs/video.js/issues/3816#issuecomment-325006547
class VideoPlayer extends React.Component {
  state = {
    updateCount: 0
  }

  componentDidMount() {
    this.setState(prevState => {
      // Important: read `prevState` instead of `this.state` when updating.
      return { updateCount: prevState.updateCount + 1 }
    })

    // instantiate video.js
    this.player = videojs(this.videoNode, this.props)
  }

  componentWillReceiveProps(nextProps) {
    // You should probably change this check
    if (this.props === nextProps) return
    this.setState(prevState => {
      // Important: read `prevState` instead of `this.state` when updating.
      return { updateCount: prevState.updateCount + 1 }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updateCount !== prevState.updateCount) {
      // If it has a player, dispose
      if (this.player) {
        this.player.dispose()
      }
      // Create new player
      this.player = videojs(this.videoNode, this.props)
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    const key = `${this.props.id || ''}-${this.state.updateCount}`
    return (
      <div key={key} data-vjs-player onKeyDown={this.handleSpaceKeyDown}>
        <video
          ref={node => (this.videoNode = node)}
          className="vjs-hqcat video-js"
        />
      </div>
    )
  }
}

export default VideoPlayer
