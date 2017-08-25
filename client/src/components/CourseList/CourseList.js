import React, { Component } from 'react'
import './course-list.css'

class CourseList extends Component {
  render () {
    return (
      <div className='course-list'>
        {this.props.courses}
      </div>
    )
  }
}

export default CourseList
