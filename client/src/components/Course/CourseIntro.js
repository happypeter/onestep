import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import FaceIcon from '@material-ui/icons/Face'
import ListIcon from '@material-ui/icons/List'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {},
  mainIntro: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      width: 800,
      margin: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000,
      margin: '0 auto'
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100,
      margin: '0 auto'
    }
  },
  section: {
    padding: theme.spacing.unit * 2,
    paddingBottom: 0,
    border: `2px solid ${theme.palette.primary.light}`
  },
  container: {
    [theme.breakpoints.up('md')]: {
      width: 800,
      margin: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000,
      margin: '0 auto'
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100,
      margin: '0 auto'
    }
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit,
    display: 'flex'
  },
  sectionWrapper: {
    padding: 8
  },
  gridItem: {
    padding: theme.spacing.unit * 2
  }
})

const introSection = (s, text, title, icon) => (
  <Grid item xs={12} sm={12} md={6} lg={6} className={s.gridItem}>
    <div className={s.section}>
      <Typography variant="caption">{text}</Typography>
      <Toolbar disableGutters className={s.sectionTitle}>
        {icon}
        <Typography variant="subheading">{title}</Typography>
      </Toolbar>
    </div>
  </Grid>
)

class CourseIntro extends React.Component {
  render() {
    const { courseIntro, classes: s } = this.props
    const { intro, learningGoal, writingToWho, title } = courseIntro

    return (
      <div className={s.root}>
        <div className={s.mainIntro}>
          <Typography variant="headline">{title}</Typography>
          <Typography variant="caption">{intro}</Typography>
        </div>

        <div className={s.sectionWrapper}>
          <Grid container className={s.container} spacing={16}>
            {introSection(s, writingToWho, '适合观众', <FaceIcon />)}
            {introSection(s, learningGoal, '知识点', <ListIcon />)}
          </Grid>
        </div>
      </div>
    )
  }
}

CourseIntro.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CourseIntro)
