import React from 'react'
import { connect } from 'react-redux'
import Buy from '../components/Buy'
import { openCourse } from '../redux/actionCreators'

const BuyContainer = props => <Buy {...props} />

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(
  mapStateToProps,
  { openCourse }
)(BuyContainer)
