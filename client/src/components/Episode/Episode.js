import React, { Component } from 'react'
import './episode.css'

class Episode extends Component {
  render () {
    return (
      <div className='episode-video'>
        <div className='video'>
          video: {this.props.episodeName}
        </div>
      </div>
    )
  }
}

export default Episode
