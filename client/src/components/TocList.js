import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

class TocList extends React.Component {
  render() {
    const { toggleSidebar } = this.props
    return (
      <List>
        <ListItem onClick={toggleSidebar}>
          <ListItemText>text</ListItemText>
        </ListItem>
      </List>
    )
  }
}

TocList.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
}

export default TocList
