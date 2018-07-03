import React from 'react'
import DrawerFooter from '../components/DrawerFooter'
import { connect } from 'react-redux'
import {
  getCurrentUser,
  getIsAuthenticated
} from '../redux/selectors/commonSelectors'

import { logout } from '../redux/actions/authAction'

const DrawerFooterContainer = props => <DrawerFooter {...props} />

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isAuthenticated: getIsAuthenticated(state)
})
export default connect(
  mapStateToProps,
  { logout }
)(DrawerFooterContainer)
