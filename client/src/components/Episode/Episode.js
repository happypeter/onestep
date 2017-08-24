import React, { Component } from 'react'
import './episode.css'

class Episode extends Component {
  render () {
    let { episodeName } = this.props.computedMatch.params

    return (
      <div className='episode-video'>
        <div className='video'>
          video: {episodeName}
        </div>
      </div>
    )
  }
}

export default Episode
