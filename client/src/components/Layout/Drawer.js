import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'

import DrawerHeader from './DrawerHeader'
import DrawerFooter from '../../containers/DrawerFooterContainer'

const styles = () => ({
  drawer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  main: {
    flexGrow: 1,
    overflow: 'auto',
    position: 'relative',
  },
  mainInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

class MyDrawer extends React.Component {
  render () {
    const { isDrawerOpen, classes: s } = this.props

    return (
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        classes={{
          paper: s.drawer,
        }}
      >
        <DrawerHeader />
        <div className={s.main}>
          <div className={s.mainInner}>Main TOC</div>
        </div>
        <DrawerFooter />
      </Drawer>
    )
  }
}

export default withStyles(styles)(MyDrawer)
