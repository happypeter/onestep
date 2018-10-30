import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import PlayerIcon from '@material-ui/icons/PlayArrow'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Link } from 'react-static'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 1
  },
  listItemText: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  button: {
    display: 'block',
    width: 200,
    margin: '32px auto',
    textAlign: 'center'
  }
})

class EpisodeList extends Component {
  render() {
    const { posts, goto, classes: s, isMember, name, price, cid } = this.props
    const postList = posts.map(t => (
      <ListItem
        key={t.link}
        onClick={
          price === '0' || isMember
            ? () => goto(`${cid}/${t.link}`)
            : () => goto('/login')
        }
      >
        <ListItemIcon>
          <PlayerIcon />
        </ListItemIcon>

        <ListItemText className={s.listItemText}>
          {price === '0' || isMember ? (
            <Typography>{t.title}</Typography>
          ) : (
            <Tooltip title="请登录，购买后再阅读" placement="left-start">
              <Typography>{t.title}</Typography>
            </Tooltip>
          )}
        </ListItemText>
      </ListItem>
    ))
    return (
      <Paper className={s.root}>
        {postList}
        {(price !== '0' || isMember) && (
          <Button
            color="primary"
            variant="contained"
            className={s.button}
            component={Link}
            to={`/steps?course=${name}&price=${price}`}
          >
            {price}元
          </Button>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(EpisodeList)
