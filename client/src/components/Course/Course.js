import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-static'
import EpisodeList from './EpisodeList'
import { MAX_WIDTH } from '../../constants/GlobalStyle'
import { videoJsOptions } from '../../lib/playerConfig'
import { videoRepo } from '../../config/config'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: MAX_WIDTH,
    margin: '24px auto'
  },
  content: {
    paddingBottom: 32
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: theme.spacing.unit * 6,
    fontWeight: 600,
    position: 'relative',
    '&:before': {
      content: '""',
      width: 48,
      height: 4,
      backgroundColor: '#00bcd4',
      position: 'absolute',
      bottom: -16,
      left: '50%',
      marginLeft: -24
    }
  },
  button: {
    textAlign: 'center',
    display: 'block',
    width: 160,
    margin: '32px auto'
  },
  header: {
    paddingTop: theme.spacing.unit * 5,
    fontSize: 18,
    fontWeight: 600,
    '&:before': {
      content: '""',
      border: '2px solid #00bcd4',
      marginRight: theme.spacing.unit
    }
  },
  intro: {
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    fontSize: 14,
    backgroundColor: '#fff'
  }
})

const Course = props => {
  const {
    classes: s,
    toc,
    posts,
    cid,
    paidCourses,
    isAuthenticated,
    isVip
  } = props
  const isAccessible =
    toc.price === '0' || isVip || (isAuthenticated && paidCourses.includes(cid))
  return (
    <div className={s.root}>
      <div className={s.title}>{toc.name}</div>
      <VideoPlayer
        {...videoJsOptions(
          `${videoRepo}/${
            cid === 'happypeter-js-kingdom' ? 'js-kingdom' : cid
          }/${toc.cover_video ? toc.cover_video : 'index'}.mp4`
        )}
      />
      <div className={s.header}>课程简介</div>
      <div className={s.intro}>
        <Typography>{toc.intro}</Typography>
      </div>
      <div className={s.header}>课程内容</div>
      <EpisodeList
        posts={posts}
        cid={cid}
        price={toc.price}
        isAccessible={isAccessible}
      />
      {!isAccessible && (
        <Button
          color="primary"
          variant="contained"
          className={s.button}
          component={Link}
          to={`/steps?course=${toc.name}&price=${toc.price}`}
        >
          {toc.price}元
        </Button>
      )}
    </div>
  )
}

export default withStyles(styles)(Course)
