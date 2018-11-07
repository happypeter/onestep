import React from 'react'
import { connect } from 'react-redux'
import Vip from '../components/Vip'
import {
  getIsAuthenticated,
  getIsAdmin
} from '../redux/selectors/commonSelectors'
import { openVip } from '../redux/actions/contentAction'

const VipContainer = props => {
  const { isAuthenticated, isAdmin } = props
  if (isAuthenticated && isAdmin) {
    return <Vip {...props} />
  }
  props.history.push('/')
  return null
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  isAdmin: getIsAdmin(state)
})

export default connect(
  mapStateToProps,
  { openVip }
)(VipContainer)
