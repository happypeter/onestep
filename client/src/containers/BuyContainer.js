import React from 'react'
import Buy from '../components/Course/Buy'
import { connect } from 'react-redux'
import { getCurrentCoursePrice } from '../redux/selectors/commonSelectors'

const BuyContainer = props => <Buy {...props} />

const mapStateToProps = state => ({
  price: getCurrentCoursePrice(state)
})

export default connect(mapStateToProps)(BuyContainer)
