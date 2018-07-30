import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { goto, toggleDrawer } from '../redux/actions'
import {
  getIsDrawerOpen,
  getIsDrawerFirstLoad
} from '../redux/selectors/commonSelectors'

import Layout from '../components/Layout/Layout'

const LayoutContainer = props => <Layout {...props} />

const mapStateToProps = state => ({
  isDrawerOpen: getIsDrawerOpen(state),
  isDrawerFirstLoad: getIsDrawerFirstLoad(state)
})

// Connect can break router , the fix is withRouter: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(
    mapStateToProps,
    {
      goto,
      toggleDrawer
    }
  )(LayoutContainer)
)
