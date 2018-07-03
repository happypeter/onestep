import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { HEADER_HEIGHT } from '../constants/GlobalStyle'

const styles = theme => ({
  paper: {
    height: HEADER_HEIGHT,
    borderRadius: 0
  }
})

class DrawerHeader extends React.Component {
  handleClick = () => {
    this.props.goto('/')
    this.props.toggleSidebar()
  }

  render() {
    const { classes: s } = this.props
    return (
      <Paper elevation={0} className={s.paper}>
        SEARCH
      </Paper>
    )
  }
}

DrawerHeader.propTypes = {
  goto: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

export default withStyles(styles)(DrawerHeader)
