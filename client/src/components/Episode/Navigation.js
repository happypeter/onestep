import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-static'
import ArrowBackIcon from '../svg/ArrowBack'
import ArrowForwardIcon from '../svg/ArrowForward'

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 6,
    justifyContent: 'space-between'
  },
  placeholder: {
    width: '48%'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    width: '48%',
    maxWidth: 320,
    border: '1px solid #E6ECF1',
    boxShadow: `0 3px 8px 0 rgba(116, 129, 141, 0.1)`,
    padding: theme.spacing.unit * 2
  },
  icon: {
    color: 'rgba(33,33,33,.8)'
  },
  prev: {
    textAlign: 'right'
  },
  index: {
    marginBottom: theme.spacing.unit
  }
})

const Navigation = ({ episodes, episodeId, courseId, classes: s }) => {
  const index = episodes.findIndex(el => el.link === episodeId)
  const previous = index === 0 ? null : episodes[index - 1]
  const next =
    index === episodes.length || index + 1 === episodes.length
      ? null
      : episodes[index + 1]

  return (
    <div className={s.root}>
      {!previous ? (
        <div className={s.placeholder} />
      ) : (
        <Link to={`/${courseId}/${previous.link}`} className={s.nav}>
          <ArrowBackIcon className={s.icon} />
          <div className={s.prev}>
            <Typography variant="caption" className={s.index}>
              Previous
            </Typography>
            <Typography variant="body1">{previous.title}</Typography>
          </div>
        </Link>
      )}

      {!next ? (
        <div className={s.placeholder} />
      ) : (
        <Link to={`/${courseId}/${next.link}`} className={s.nav}>
          <div className={s.next}>
            <Typography variant="caption" className={s.index}>
              Next
            </Typography>
            <Typography variant="body1">{next.title}</Typography>
          </div>
          <ArrowForwardIcon className={s.icon} />
        </Link>
      )}
    </div>
  )
}

export default withStyles(styles)(Navigation)
