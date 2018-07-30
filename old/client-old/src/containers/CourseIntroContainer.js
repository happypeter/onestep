import React from 'react'
import CourseIntro from '../components/Course/CourseIntro'
import { connect } from 'react-redux'
import { getCurrentCourseIntro } from '../redux/selectors/commonSelectors'

const CourseIntroContainer = props => <CourseIntro {...props} />

const mapStateToProps = state => ({
  courseIntro: getCurrentCourseIntro(state)
})

export default connect(mapStateToProps)(CourseIntroContainer)
