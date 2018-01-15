import React from 'react'
import {connect} from 'react-redux'
import ResetPassword from '../components/oauth/ResetPassword'
import {resetPassword} from '../redux/actions/authAction'

const ResetPasswordContainer = props => <ResetPassword {...props} />

export default connect(null, {resetPassword})(ResetPasswordContainer)
