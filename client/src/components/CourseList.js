import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style/course-list.css'

class CourseList extends Component {
  render(){
    let courses = this.props.courses.map((item, i) => (
      <div key={i} className='course'>
        <img src={`${item.post}`} alt='poster' className='poster' />
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

const mapStateToProps = (state) => ({
  courses: state
})

export default connect(mapStateToProps)(CourseList)
