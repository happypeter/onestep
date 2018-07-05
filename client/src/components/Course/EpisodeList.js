import React from 'react'
import { Typography, ListItemIcon } from '@material-ui/core'
import { ListItem, ListItemText } from '@material-ui/core'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: 800,
      margin: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000,
      margin: '0 auto'
    },
    [theme.breakpoints.up('xl')]: {
      width: 1400,
      margin: '0 auto'
    }
  }
})

class EpisodeList extends React.Component {
  render() {
    const { episodes, courseUid, goto, classes: s } = this.props
    const epList = episodes.map(t => (
      <ListItem
        key={t.uid}
        button
        onClick={() => goto(`/${courseUid}/${t.uid}`)}
      >
        <ListItemIcon>
          <PlayerIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t.title}</Typography>
        </ListItemText>
      </ListItem>
    ))
    return <div className={s.root}>{epList}</div>
  }
}

EpisodeList.propTypes = {
  courseUid: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
  goto: PropTypes.func.isRequired
}

export default withStyles(styles)(EpisodeList)
