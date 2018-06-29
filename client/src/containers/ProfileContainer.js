import React from 'react'
import { connect } from 'react-redux'
import { signContract, checkContract } from '../redux/actions/contentAction'
import {
  getProfile,
  getPaidCourses
} from '../redux/selectors/commonSelectors.js'
import { getCurrentUser } from '../redux/selectors/commonSelectors.js'
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
  paidCourses: getPaidCourses(state)
})

export default connect(
  mapStateToProps,
  {
    signContract,
    checkContract
  }
)(ProfileContainer)
