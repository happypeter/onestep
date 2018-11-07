import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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
  button: { marginTop: 24 }
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
    const { classes: s } = this.props
    const { phoneNum, course } = this.state

    return (
      <Paper className={s.root}>
        <div className={s.title}>开通课程权限</div>
        <TextField
          style={{ width: '100%' }}
          onChange={this.handlePhoneNumChange}
          margin="dense"
          label="Phone"
          value={phoneNum}
        />
        <TextField
          style={{ width: '100%' }}
          onChange={this.handleCourseChange}
          margin="dense"
          label="Course"
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
      </Paper>
    )
  }
}

export default withStyles(styles)(Buy)
