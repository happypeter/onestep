import React from 'react'
import { connect } from 'react-redux'
import { getIsDrawerOpen } from '../selectors'
import Drawer from '../components/Layout/Drawer'

const DrawerContainer = props => <Drawer {...props} />

const mapStateToProps = state => ({
  isDrawerOpen: getIsDrawerOpen(state)
})

export default connect(mapStateToProps)(DrawerContainer)
