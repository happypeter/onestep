import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-static'
import EpisodeList from './EpisodeList'
import { MAX_WIDTH } from '../../constants/GlobalStyle'

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
    fontSize: 18,
    marginBottom: 24
  },
  button: {
    textAlign: 'center',
    display: 'block',
    width: 160,
    margin: '32px auto'
  }
})

const Course = props => {
  const { classes: s, toc, posts, cid, paidCourses, isAuthenticated } = props
  const isAccessible =
    toc.price === '0' || (isAuthenticated && paidCourses.includes(cid))
  return (
    <div className={s.root}>
      <div className={s.title}>{toc.name}</div>
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
