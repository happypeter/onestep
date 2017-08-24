import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/episode.css'

class Episode extends Component {
  render(){
    let { episodeName } = this.props.match.params

    return(
      <div className='episode-video'>
        <div className='video'>
          video: {episodeName}
        </div>
      </div>
    )
  }
}

export default Episode
