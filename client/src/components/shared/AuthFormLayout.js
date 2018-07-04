import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import BindPhoneNote from '../Login/BindPhoneNote'
import Typography from '@material-ui/core/Typography'
const styles = theme => ({
  container: {
    width: 300,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column'
  },
  titleWrap: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'center',
    padding: theme.spacing.unit * 3
  },
  title: {
    color: 'white'
  }
})
class AuthFormLayout extends React.Component {
  render() {
    const { children, classes: s, notice, title } = this.props
    return (
      <div>
        {notice && <BindPhoneNote />}
        <div className={s.container}>
          <div className={s.titleWrap}>
            <Typography className={s.title} variant="title">
              {title}
            </Typography>
          </div>
          <Paper>{children}</Paper>
        </div>
      </div>
    )
  }
}

AuthFormLayout.propTypes = {
  children: PropTypes.object.isRequired,
  notice: PropTypes.bool
}

export default withStyles(styles)(AuthFormLayout)
