import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import EpisodeList from '../../containers/EpisodeListContainer'
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
  }
})

class Course extends Component {
  render() {
    const { classes: s, posts, toc, cid } = this.props
    return (
      <div className={s.root}>
        <div className={s.title}>{toc.name}</div>
        <EpisodeList
          posts={posts}
          name={toc.name}
          price={toc.price}
          cid={cid}
        />
      </div>
    )
  }
}

export default withStyles(styles)(Course)
