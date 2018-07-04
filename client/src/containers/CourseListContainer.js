import React from 'react'
import { connect } from 'react-redux'
import { fetchCoursesIfNeeded } from '../redux/actions/contentAction'
import { getCourses } from '../redux/selectors/commonSelectors.js'
import LoadingComponent from '../components/common/Loading'
import Loadable from 'react-loadable'

const AsyncCourseList = Loadable({
  loader: () => import('../components/CourseList/CourseList'),
  loading: LoadingComponent,
  delay: 300
})

const CourseListContainer = props => <AsyncCourseList {...props} />

const mapStateToProps = state => ({
  courses: getCourses(state)
})

export default connect(
  mapStateToProps,
  { fetchCoursesIfNeeded }
)(CourseListContainer)
