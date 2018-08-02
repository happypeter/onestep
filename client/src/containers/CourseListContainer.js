import React from 'react'
import { connect } from 'react-redux'
import { goto } from '../redux/actions'
import CourseList from '../components/CourseList'

const CourseListContainer = props => <CourseList {...props} />

export default connect(
  null,
  { goto }
)(CourseListContainer)
