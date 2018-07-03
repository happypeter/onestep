import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

const ChaptList = ({ toc, toggleSidebar }) => {
  return toc.map(t => (
    <ListItem key={t.link} onClick={toggleSidebar}>
      <ListItemText>{t.title}</ListItemText>
    </ListItem>
  ))
}

class TocList extends React.Component {
  render() {
    const { toggleSidebar, episodes } = this.props
    const tocList = episodes.map((t, i) => (
      <ChaptList key={i} toc={t.section} toggleSidebar={toggleSidebar} />
    ))
    return <List>{tocList}</List>
  }
}

TocList.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  episodes: PropTypes.array.isRequired
}

export default TocList
