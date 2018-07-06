import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

class Home extends React.Component {
  componentDidMount () {
    this.props.openIt()
  }

  render () {
    return (
      <div>
        <Button>Hello</Button>
      </div>
    )
  }
}

Home.propTypes = {
  openIt: PropTypes.func.isRequired,
}
export default Home
