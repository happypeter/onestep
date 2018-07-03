import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import BindPhoneNote from './Login/BindPhoneNote'
import Typography from '@material-ui/core/Typography'
const styles = theme => ({
  container: {
    width: 300,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  }
})
class AuthFormLayout extends React.Component {
  render() {
    const { children, classes: s, notice, title } = this.props
    return (
      <div>
        {notice && <BindPhoneNote />}
        <div className={s.container}>
          <div className={s.title}>
            <Typography variant="title">{title}</Typography>
          </div>
          <Paper>{children}</Paper>
        </div>
      </div>
    )
  }
}

AuthFormLayout.propTypes = {
  children: PropTypes.object.isRequired,
  notice: PropTypes.bool.isRequired
}

export default withStyles(styles)(AuthFormLayout)
