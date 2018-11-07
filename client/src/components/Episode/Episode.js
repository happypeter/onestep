import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-static'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { videoJsOptions } from '../../lib/playerConfig'
import { videoRepo } from '../../config/config'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import Navigation from './Navigation'
import EpisodeDoc from './EpisodeDoc'

const styles = theme => ({
  hero: {
    paddingTop: 56,
    paddingBottom: 16,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 40,
      paddingBottom: 40
    },
    background: `linear-gradient(60deg,#0097a7,#00bcd4)`
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    color: '#ffffff',
    width: 24,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  cTitle: {
    color: `rgba(255, 255, 255, 0.8)`,
    textDecoration: 'none',
    fontSize: 16
  },
  pTitle: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
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
    maxHeight: 0,
    transition: 'all .5s ease',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'unset',
      overflow: 'unset',
      transition: 'none',
      marginTop: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 5,
      width: 260
    },
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
  sidebarOpen: {
    maxHeight: 480,
    transition: 'all .8s ease'
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
    fontSize: 22,
    [theme.breakpoints.up('sm')]: {
      fontSize: 24
    },
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 32,
    color: '#343f44'
  }
})

class Episode extends Component {
  state = {
    open: false
  }

  toggleSidebar = () => {
    this.setState({ open: !this.state.open })
  }

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

    const { open } = this.state

    return (
      <div>
        <div className={s.hero}>
          <div className={classNames(s.wrapper, s.container)}>
            <div>
              <Link to={`/${cid}`} className={s.cTitle}>
                {title}
              </Link>
              <div className={s.pTitle}>{post.title}</div>
            </div>
            <IconButton
              className={s.button}
              disableRipple
              onClick={this.toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
        {isAccessible ? (
          <div className={classNames(s.root, s.container)}>
            <div
              className={
                open ? classNames(s.sidebar, s.sidebarOpen) : s.sidebar
              }
            >
              {posts.map(item => (
                <Link to={`/${cid}/${item.link}`} key={item.link}>
                  {item.title}
                </Link>
              ))}
            </div>
            <div>
              <div className={s.content}>
                <div className={s.title}>{post.title}</div>
                <VideoPlayer
                  {...videoJsOptions(`${videoRepo}/${cid}/${post.link}.mp4`)}
                />
                <EpisodeDoc doc={markdown} />
              </div>
              <Navigation
                episodes={posts}
                episodeId={post.link}
                courseId={cid}
              />
            </div>
          </div>
        ) : (
          <div>请购买后阅读</div>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(Episode)
