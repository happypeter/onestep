import React, { Component } from 'react'
import {
  Typography,
  ListItemIcon,
  ListItem,
  ListItemText,
  Tooltip
} from '@material-ui/core'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1
  },
  listItemText: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  }
})

class EpisodeList extends Component {
  render() {
    const { posts, goto, classes: s, isMember } = this.props
    const postList = posts.map(t => (
      <ListItem
        key={t.link}
        onClick={
          isMember ? () => goto(`/coin/${t.link}`) : () => goto('/login')
        }
      >
        <ListItemIcon>
          <PlayerIcon />
        </ListItemIcon>

        <ListItemText className={s.listItemText}>
          {isMember ? (
            <Typography>{t.title}</Typography>
          ) : (
            <Tooltip title="请先登录" placement="left-start">
              <Typography>{t.title}</Typography>
            </Tooltip>
          )}
        </ListItemText>
      </ListItem>
    ))
    return <div className={s.root}>{postList}</div>
  }
}

export default withStyles(styles)(EpisodeList)
