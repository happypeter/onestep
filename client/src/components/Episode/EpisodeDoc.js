import React from 'react'
import { withStyles } from '@material-ui/core/styles'
const md = require('markdown-it')()

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    fontFamily: `'Helvetica Neue',Helvetica,Arial,Sans-serif`,
    lineHeight: 2.2,
    fontSize: 16,
    color: '#343f44',
    '& h1': {
      display: 'none'
    },
    '& h2': {
      marginTop: 32,
      fontSize: 22
    },
    '& h3': {
      marginTop: 32,
      fontSize: 20
    },
    '& pre': {
      border: `2px solid ${theme.palette.primary.light}`,
      padding: theme.spacing.unit * 2,
      fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
      overflow: 'auto',
      lineHeight: 1.8
    },
    '& a': {
      color: '#00bcd4',
      fontStyle: 'normal'
    },
    '& blockquote': {
      margin: '32px 0',
      padding: `0 ${theme.spacing.unit * 4}px`,
      borderLeft: '4px solid #00bcd4',
      borderRadius: 3,
      backgroundColor: '#fff',
      fontSize: 16
    },
    '& ul': {
      paddingLeft: '1.3em',
      '& li p': {
        marginTop: 0,
        marginBottom: 0
      }
    },
    '& p': {
      wordBreak: 'break-word',
      fontSize: 16
    }
  }
})

const EpisodeDoc = ({ classes: s, doc }) => {
  const result = md.render(doc)
  return <div dangerouslySetInnerHTML={{ __html: result }} className={s.root} />
}

export default withStyles(styles)(EpisodeDoc)
