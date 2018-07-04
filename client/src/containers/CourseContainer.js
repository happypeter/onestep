import React from 'react'
import { connect } from 'react-redux'
import { fetchCurrentCourse } from '../redux/actions/contentAction'
import Course from '../components/Course/Course'
import { getCourseIntroVideoLink } from '../redux/selectors/commonSelectors'

const CourseContainer = props => <Course {...props} />

const mapStateToPorps = state => ({
  videoLink: getCourseIntroVideoLink(state)
})

export default connect(
  mapStateToPorps,
  { fetchCurrentCourse }
)(CourseContainer)
