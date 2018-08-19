import React from 'react'
import { connect } from 'react-redux'
import Open from '../components/Open'
import {
  getIsAuthenticated,
  getIsAdmin
} from '../redux/selectors/commonSelectors'
import { open } from '../redux/actions/contentAction'

const OpenContainer = props => {
  if (props.isAuthenticated) {
    return <Open {...props} />
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
  { open }
)(OpenContainer)
