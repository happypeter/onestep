import React from 'react'
import { Typography, ListItemIcon } from '@material-ui/core'
import { ListItem, ListItemText } from '@material-ui/core'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import { goto } from '../../redux/actions'
import PropTypes from 'prop-types'

class EpisodeList extends React.Component {
  render() {
    const { episodes, courseUid, goto } = this.props
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
    return <div>{epList}</div>
  }
}

EpisodeList.propTypes = {
  courseUid: PropTypes.string.isRequired,
  episodes: PropTypes.array.isRequired,
  goto: PropTypes.func.isRequired
}

export default EpisodeList
