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
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    border: '2px solid blue',
    height: '100%'
  },
  itemActive: {
    color: theme.palette.primary.main
  },
  nothingWrap: {
    border: '2px solid red',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
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
      currentCourseName,
      currentEpisodeUid,
      classes: s,
      isOnEpisodePage
    } = this.props
    const chaptList = toc => {
      return toc.map(t => (
        <ListItem
          button
          key={t.uid}
          onClick={() => this.handleItemClick(`/${currentCourseUid}/${t.uid}`)}
        >
          <ListItemIcon>
            <PlayerIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography
              className={classNames({
                [s.itemActive]: currentEpisodeUid === t.uid
              })}
              variant="body1"
            >
              {t.title}
            </Typography>
          </ListItemText>
        </ListItem>
      ))
    }

    const tocList = episodes.map(t => chaptList(t.section))
    const list = (
      <List>
        <ListItem
          button
          onClick={() => this.handleItemClick(`/${currentCourseUid}`)}
        >
          <ListItemText>{currentCourseName}</ListItemText>
        </ListItem>
        {tocList}
      </List>
    )

    const nothing = (
      <div className={s.nothingWrap}>
        <Typography>通常这里都是用来显示目录的</Typography>
      </div>
    )
    const content = isOnEpisodePage ? list : nothing
    return <div className={s.root}>{content}</div>
  }
}

TocList.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  episodes: PropTypes.array.isRequired,
  goto: PropTypes.func.isRequired,
  currentCourseUid: PropTypes.string.isRequired,
  currentCourseName: PropTypes.string.isRequired,
  isOnEpisodePage: PropTypes.bool.isRequired
}

export default compose(
  withStyles(styles),
  withWidth()
)(TocList)
