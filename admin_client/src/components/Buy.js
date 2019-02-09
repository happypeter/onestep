import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import config from '../config/config'

const styles = theme => ({
  root: {
    width: 340,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 32
  },
  title: {
    textAlign: 'center',
    marginBottom: 24
  },
  button: { marginTop: 24 },
  notice: { color: '#ff4081', textAlign: 'center', marginTop: 24 }
})

class Buy extends Component {
  state = { phoneNum: '', course: '' }

  handleSubmit = () => {
    const { phoneNum, course } = this.state
    this.props.openCourse({ phoneNum, course })
  }

  handlePhoneNumChange = e => {
    this.setState({ phoneNum: e.target.value })
  }

  handleCourseChange = e => {
    this.setState({ course: e.target.value })
  }

  render() {
    const { classes: s, notification } = this.props
    const { phoneNum, course } = this.state
    return (
      <Paper className={s.root}>
        <div className={s.title}>开通课程权限</div>

        <TextField
          style={{ width: '100%' }}
          onChange={this.handlePhoneNumChange}
          margin="dense"
          label="手机号"
          value={phoneNum}
        />
        <TextField
          style={{ width: '100%' }}
          onChange={this.handleCourseChange}
          margin="dense"
          label="课程名"
          value={course}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={this.handleSubmit}
          className={s.button}
        >
          提交
        </Button>

        {notification.text ? (
          <div className={s.notice}>{notification.text}</div>
        ) : null}
      </Paper>
    )
  }
}

export default withStyles(styles)(Buy)
