import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import BindPhoneNote from '../Login/BindPhoneNote'
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
  items: {},
  note: {
    width: 340,
    margin: `32px auto`
  }
})
class AuthFormLayout extends React.Component {
  render() {
    const { children, classes: s, notice, title } = this.props
    return (
      <div>
        <Paper className={s.note}>{notice && <BindPhoneNote />}</Paper>
        <Paper className={s.container}>
          <div className={s.titleWrap}>
            <Typography className={s.title} variant="title">
              {title}
            </Typography>
          </div>
          <div className={s.items}>{children}</div>
        </Paper>
      </div>
    )
  }
}

AuthFormLayout.propTypes = {
  children: PropTypes.object.isRequired,
  notice: PropTypes.bool
}

export default withStyles(styles)(AuthFormLayout)
