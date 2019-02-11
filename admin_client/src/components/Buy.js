import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { courses } from '../../data/courses'

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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { classes: s, notification } = this.props
    const { phoneNum, course } = this.state
    return (
      <Paper className={s.root}>
        <div className={s.title}>开通课程权限</div>

        <TextField
          style={{ width: '100%' }}
          onChange={this.handleChange('phoneNum')}
          label="手机号"
          value={phoneNum}
          margin="normal"
        />

        <TextField
          style={{ width: '100%' }}
          select
          label="课程名"
          className={s.textField}
          value={course}
          onChange={this.handleChange('course')}
          margin="normal"
        >
          {courses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
