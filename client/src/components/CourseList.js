import React, { Component } from 'react'
import store from '../redux/store'

class CourseList extends Component {

  render(){
    let courses = store.getState().map((item, i) => (
      <div key={i} className='course'>
        <img src={`${item.post}`} alt='poster' />
        <h2>{item.title}</h2>
        <p>{item.msg}</p>
      </div>
    ))

    return(
      <div className="course-list">
        {courses}
      </div>
    )
  }
}

export default CourseList
