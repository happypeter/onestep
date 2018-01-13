import React, {Component} from 'react'
import {connect} from 'react-redux'
import ResetPassword from '../components/Profile/ResetPassword'
import {resetPassword} from '../redux/actions/authAction'
import PropTypes from 'prop-types'

const ResetPasswordContainer = props => <ResetPassword {...props} />

const mapStateToProps = state => ({
  auth: state.fakeAuth,
})

export default connect(mapStateToProps, {
  resetPassword,
})(ResetPasswordContainer)
