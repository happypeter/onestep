import React, { Component } from 'react'
import EpisodeDoc from './EpisodeDoc'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { withRouteData } from 'react-static'
import { Link } from 'react-static'
import classNames from 'classnames'
import { videoJsOptions } from '../../lib/playerConfig'
import { videoRepo } from '../../config/config'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

const styles = theme => ({
  hero: {
    paddingTop: 40,
    paddingBottom: 40,
    background: `linear-gradient(60deg,#0097a7,#00bcd4)`
  },
  cTitle: {
    color: `rgba(255, 255, 255, 0.8)`,
    textDecoration: 'none',
    fontSize: 16
  },
  pTitle: {
    color: '#fff',
    marginLeft: 16,
    paddingLeft: 16,
    position: 'relative',
    display: 'inline-block',
    fontSize: 14,
    fontWeight: 600,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 1,
      display: 'block',
      width: 1,
      height: 24,
      transform: 'rotate(25deg)',
      background: `rgba(255, 255, 255, 0.3)`
    }
  },
  container: {
    maxWidth: 1280,
    margin: '0 auto',
    width: '100%',
    padding: '0 16px'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    },
    backgroundColor: '#f8fafc'
  },
  sidebar: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 5
    },
    marginRight: theme.spacing.unit * 5,
    minWidth: 180,
    flexShrink: 0,
    '&>a': {
      display: 'block',
      fontSize: 14,
      textDecoration: 'none',
      paddingBottom: theme.spacing.unit * 2,
      color: '#738a94',
      transition: `all .3s ease`,
      fontWeight: 500,
      '&:hover': {
        color: '#0097a7'
      },
      '&.active': {
        color: '#00bcd4'
      }
    }
  },
  content: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 4
    },
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 8}px`
    },
    width: '100%',
    maxWidth: 760,
    margin: '0 auto',
    backgroundColor: '#fff',
    boxShadow: `0 0 5px rgba(0,0,0,.02), 0 5px 22px -8px rgba(0, 0, 0, .1)`
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 32
  }
})

class Episode extends Component {
  render() {
    const {
      markdown,
      classes: s,
      isAuthenticated,
      paidCourses,
      post,
      posts,
      price,
      cid,
      title
    } = this.props
    const isAccessible =
      (price && price === '0') || (isAuthenticated && paidCourses.includes(cid))
    return (
      <div>
        <div className={s.hero}>
          <div className={s.container}>
            <Link to={`/${cid}`} className={s.cTitle}>
              {title}
            </Link>
            <div className={s.pTitle}>{post.title}</div>
          </div>
        </div>
        {isAccessible ? (
          <div className={classNames(s.root, s.container)}>
            <div className={s.sidebar}>
              {posts.map(item => (
                <Link to={`/${cid}/${item.link}`} key={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>
            <div className={s.content}>
              <div className={s.title}>{post.title}</div>
              <VideoPlayer
                {...videoJsOptions(`${videoRepo}/${cid}/${post.link}.mp4`)}
              />
              <EpisodeDoc doc={markdown} />
            </div>
          </div>
        ) : (
          <div>请购买后阅读</div>
        )}
      </div>
    )
  }
}

const WrapperEpisode = compose(
  withStyles(styles),
  withWidth()
)(Episode)

export default withRouteData(WrapperEpisode)
