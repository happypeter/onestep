import React from 'react'
import { connect } from 'react-redux'
import Buy from '../components/Buy'
import { openCourse } from '../redux/actionCreators'

const BuyContainer = props => <Buy {...props} />

export default connect(
  null,
  { openCourse }
)(BuyContainer)
