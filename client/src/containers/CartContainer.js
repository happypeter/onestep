import React from 'react'
import Cart from '../components/Cart/Cart'
import {
  getCurrentCoursePrice,
  getCurrentCourseUid,
  getCurrentCourseName
} from '../redux/selectors/commonSelectors'
import { connect } from 'react-redux'

const CartContainer = props => <Cart {...props} />

const mapStateToProps = state => ({
  price: getCurrentCoursePrice(state),
  uid: getCurrentCourseUid(state),
  courseName: getCurrentCourseName(state)
})

export default connect(mapStateToProps)(CartContainer)
