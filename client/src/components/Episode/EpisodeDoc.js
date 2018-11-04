import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
const md = require('markdown-it')()

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    fontFamily: `'Helvetica Neue',Helvetica,Arial,Sans-serif`,
    lineHeight: 1.9,
    fontSize: 16,
    '& h2': {
      fontSize: 20
    },
    '& pre': {
      border: `2px solid ${theme.palette.primary.light}`,
      padding: theme.spacing.unit,
      fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
      overflow: 'auto'
    },
    '& a': {
      color: '#00bcd4',
      fontStyle: 'normal'
    }
  }
})

class EpisodeDoc extends Component {
  render() {
    const { classes: s, doc } = this.props
    const result = md.render(doc)
    return (
      <div dangerouslySetInnerHTML={{ __html: result }} className={s.root} />
    )
  }
}

export default withStyles(styles)(EpisodeDoc)
