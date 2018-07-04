import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import withWidth from '@material-ui/core/withWidth'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  itemActive: {
    border: '2px solid red'
  }
})

class TocList extends React.Component {
  handleItemClick = path => {
    const { width } = this.props
    this.props.goto(path)
    if (width === 'xl' || width === 'lg') return
    this.props.toggleDrawer()
  }

  render() {
    const {
      episodes,
      currentCourseUid,
      currentEpisodeUid,
      classes: s
    } = this.props
    const chaptList = toc => {
      return toc.map(t => (
        <ListItem
          button
          key={t.uid}
          onClick={() => this.handleItemClick(`/${currentCourseUid}/${t.uid}`)}
          className={classNames({
            [s.itemActive]: currentEpisodeUid === t.uid
          })}
        >
          <ListItemIcon>
            <PlayerIcon />
          </ListItemIcon>
          <ListItemText>{t.title}</ListItemText>
        </ListItem>
      ))
    }

    const tocList = episodes.map(t => chaptList(t.section))
    return <List>{tocList}</List>
  }
}

TocList.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  episodes: PropTypes.array.isRequired,
  goto: PropTypes.func.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(TocList)
