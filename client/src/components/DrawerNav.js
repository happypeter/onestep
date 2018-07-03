import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

class DrawerNav extends React.Component {
  handleClick = () => {
    this.props.goto('/')
    this.props.toggleSidebar()
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Home</Button>
      </div>
    )
  }
}

DrawerNav.propTypes = {
  goto: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}

export default DrawerNav
