import React from 'react'
import { connect } from 'react-redux'
import Buy from '../components/Buy'
import {
  getIsAuthenticated,
  getIsAdmin
} from '../redux/selectors/commonSelectors'
import { openCourse } from '../redux/actions/contentAction'

const BuyContainer = props => {
  const { isAuthenticated, isAdmin } = props
  if (isAuthenticated && isAdmin) {
    return <Buy {...props} />
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
  { openCourse }
)(BuyContainer)
