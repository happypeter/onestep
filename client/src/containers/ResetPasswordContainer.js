import React from 'react'
import {connect} from 'react-redux'
import ResetPassword from '../components/Profile/ResetPassword'
import {resetPassword} from '../redux/actions/authAction'

const ResetPasswordContainer = props => <ResetPassword {...props} />

const mapStateToProps = state => ({
  auth: state.fakeAuth,
})

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPasswordContainer)
