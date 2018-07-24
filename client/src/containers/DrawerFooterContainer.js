import React from 'react'
import { connect } from 'react-redux'

import DrawerFooter from '../components/Layout/DrawerFooter'
import {
  getCurrentUser,
  getIsAuthenticated
} from '../redux/selectors/commonSelectors'
import { logout } from '../redux/actions/authAction'
import { goto, toggleDrawer } from '../redux/actions'

const DrawerFooterContainer = props => <DrawerFooter {...props} />

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state)
})
export default connect(
  mapStateToProps,
  { logout, goto, toggleDrawer }
)(DrawerFooterContainer)
