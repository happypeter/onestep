import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-static'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3
  },
  paper: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
})

const EpisodeList = ({ classes: s, posts, cid, isAccessible }) => {
  const postList = posts.map(t => (
    <Paper className={s.paper} elevation={0} key={t.link}>
      <ListItem
        component={Link}
        to={isAccessible ? `/${cid}/${t.link}` : '/login'}
      >
        <ListItemIcon>
          <PlayerIcon />
        </ListItemIcon>

        <ListItemText>
          {isAccessible ? (
            <Typography>{t.title}</Typography>
          ) : (
            <Tooltip title="请购买后再阅读" placement="left-start">
              <Typography>{t.title}</Typography>
            </Tooltip>
          )}
        </ListItemText>
      </ListItem>
    </Paper>
  ))
  return <div className={s.root}>{postList}</div>
}

export default withStyles(styles)(EpisodeList)
