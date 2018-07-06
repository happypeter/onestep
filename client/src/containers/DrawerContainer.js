import React from 'react'
import { connect } from 'react-redux'
import Drawer from '../components/Drawer/Drawer'
import { getIsDrawerOpen } from '../selectors'

const DrawerContainer = props => <Drawer {...props} />

const mapStateToProps = state => ({
  isDrawerOpen: getIsDrawerOpen(state),
})

export default connect(mapStateToProps)(DrawerContainer)
