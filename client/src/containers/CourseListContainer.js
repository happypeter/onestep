import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseList from '../components/CourseList/CourseList'

class CourseListContainer extends Component {
  render () {
    return (
      <div>
        <CourseList courses={this.props.courses} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses
})

export default connect(mapStateToProps)(CourseListContainer)
