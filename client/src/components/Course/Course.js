import React, { Component } from 'react'
import './course.css'

class Course extends Component {
  render () {
    let {src, episode} = this.props
    return (
      <div className='episode-list'>
        <img src={src} alt='poster' className='intro' />
        <h2>章节列表</h2>
        { episode }
      </div>
    )
  }
}

export default Course
