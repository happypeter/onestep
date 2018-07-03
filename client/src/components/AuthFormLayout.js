import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import BindPhoneNote from './Login/BindPhoneNote'
const styles = () => ({
  container: {
    border: '1px solid red',
    width: 300,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column'
  }
})
class AuthFormLayout extends React.Component {
  render() {
    const { children, classes: s, notice } = this.props
    return (
      <div>
        {notice && <BindPhoneNote />}
        <div className={s.container}>
          <Paper>{children}</Paper>
        </div>
      </div>
    )
  }
}

AuthFormLayout.propTypes = {
  children: PropTypes.array.isRequired,
  notice: PropTypes.bool.isRequired
}

export default withStyles(styles)(AuthFormLayout)
