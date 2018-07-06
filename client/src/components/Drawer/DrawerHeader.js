import React from 'react'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

import { HEADER_HEIGHT } from '../../constants/GlobalStyle'

const styles = () => ({
  paper: {
    height: HEADER_HEIGHT,
    borderRadius: 0,
  },
})

class DrawerHeader extends React.Component {
  render () {
    const { classes: s } = this.props
    return (
      <Paper elevation={0} className={s.paper}>
        <Toolbar>
          <Input fullWidth placeholder="搜索功能开发中" />
        </Toolbar>
      </Paper>
    )
  }
}

export default withStyles(styles)(DrawerHeader)
