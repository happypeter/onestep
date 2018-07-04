import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrentCourse } from '../redux/actions/contentAction'
import Course from '../components/Course/Course'

class CourseContainer extends Component {
  render() {
    return <Course {...this.props} />
  }
}

export default connect(
  null,
  {
    fetchCurrentCourse
  }
)(CourseContainer)
