import React from 'react'
import { connect } from 'react-redux'
import {
  signContract,
  checkContract,
  fetchCoursesIfNeeded
} from '../redux/actions/contentAction'
import {
  getProfile,
  getDetailedPaidCourses
} from '../redux/selectors/commonSelectors.js'
import { goto } from '../redux/actions'
import {
  getCurrentUser,
  getIsMember
} from '../redux/selectors/commonSelectors.js'
import Loadable from 'react-loadable'
import LoadingComponent from '../components/common/Loading'

const AsyncProfile = Loadable({
  loader: () => import('../components/Profile/Profile'),
  loading: LoadingComponent,
  delay: 300
})

const ProfileContainer = props => <AsyncProfile {...props} />

const mapStateToProps = state => ({
  profile: getProfile(state),
  auth: getCurrentUser(state),
  courses: getDetailedPaidCourses(state),
  anyCourse: !!getDetailedPaidCourses(state).length,
  isMember: getIsMember(state)
})

export default connect(
  mapStateToProps,
  {
    signContract,
    checkContract,
    fetchCoursesIfNeeded,
    goto
  }
)(ProfileContainer)
