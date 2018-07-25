import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    width: 340,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 32
  },
  titleWrap: {
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    color: theme.palette.primary.main
  },
  items: {}
})

class AuthFormLayout extends React.Component {
  render() {
    const { children, classes: s, title } = this.props
    return (
      <Paper className={s.container}>
        <div className={s.titleWrap}>
          <Typography className={s.title} variant="title">
            {title}
          </Typography>
        </div>
        <div className={s.items}>{children}</div>
      </Paper>
    )
  }
}

AuthFormLayout.propTypes = {
  children: PropTypes.object.isRequired,
  notice: PropTypes.bool
}

export default withStyles(styles)(AuthFormLayout)
