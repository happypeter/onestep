import React from 'react'
import {connect} from 'react-redux'
import ResetPassword from '../components/Profile/Password'
import {modifyPassword} from '../redux/actions/authAction'

const PasswordContainer = props => <ResetPassword {...props} />

export default connect(null, {modifyPassword})(PasswordContainer)
