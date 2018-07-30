import React, { Component } from 'react'
import { Typography, ListItemIcon } from '@material-ui/core'
import { ListItem, ListItemText } from '@material-ui/core'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1
  }
})

class EpisodeList extends Component {
  render() {
    const { posts, goto, classes: s, isMember } = this.props
    const postList = posts.map(t => (
      <ListItem
        key={t.link}
        button={isMember ? true : false}
        onClick={isMember ? () => goto(`/course/post/${t.link}`) : null}
      >
        <ListItemIcon>
          <PlayerIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography>{t.title}</Typography>
        </ListItemText>
      </ListItem>
    ))
    return <div className={s.root}>{postList}</div>
  }
}

export default withStyles(styles)(EpisodeList)
