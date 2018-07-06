import React from 'react'
import PropTypes from 'prop-types'

class Layout extends React.Component {
  render () {
    const { children } = this.props
    return (
      <div>
        HEADER
        {children}
        FOOTER
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Layout
