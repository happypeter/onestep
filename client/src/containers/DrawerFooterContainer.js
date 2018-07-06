import React from 'react'
import { connect } from 'react-redux'

import DrawerFooter from '../components/Layout/DrawerFooter'
import { getCurrentUser, getIsAuthenticated } from '../selectors/'
import { logout } from '../actions/authActions'
import { goto, toggleDrawer } from '../actions'

const DrawerFooterContainer = props => <DrawerFooter {...props} />

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state),
})
export default connect(
  mapStateToProps,
  { logout, goto, toggleDrawer }
)(DrawerFooterContainer)
