import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'

const Layout = props => {
  return (
    <div>
      <Header {...props} />
      {props.notification}
      {props.children}
    </div>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired
}

export default Layout
