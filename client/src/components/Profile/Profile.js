import React from 'react'
import PropTypes from 'prop-types'

class Profile extends React.Component {
  componentDidMount () {
    this.props.checkAuth()
  }

  render () {
    return <div>My Profile</div>
  }
}

Profile.propTypes = {
  checkAuth: PropTypes.func.isRequired,
}

export default Profile
