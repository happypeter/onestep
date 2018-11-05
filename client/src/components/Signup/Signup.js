import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import isEmpty from 'lodash.isempty'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import Layout from '../shared/AuthFormLayout'
import { ERROR_COLOR } from '../../constants/GlobalStyle'

const WAIT_INTERVAL = 1000
const styles = theme => ({
  row: {
    display: 'flex',
    width: '100%'
  },
  error: {
    color: ERROR_COLOR
  }
})

class Signup extends Component {
  state = {
    userName: '',
    phoneNum: '',
    password: '',
    smsCode: '',
    errors: {}
  }

  componentDidMount = () => {
    this.timers = {}
  }

  componentWillUnmount = () => {
    this.clearTimers()
  }

  clearTimers = () => {
    let items = Object.keys(this.timers)
    for (let i = 0; i < items.length; i++) {
      clearTimeout(this.timers[items[i]])
    }

    this.timers = null
  }

  validate = () => {
    const { userName, phoneNum, smsCode, password } = this.state
    const errors = {}
    if (!userName) {
      errors.userName = '用户名不能为空'
    }
    if (!phoneNum || !/^1[3|4|5|7|8][0-9]\d{8}$/.test(phoneNum)) {
      errors.phoneNum = '手机号格式不正确'
    }
    if (!smsCode) {
      errors.smsCode = '验证码不能为空'
    }
    if (!password || password.length < 6) {
      errors.password = '密码长度不能小于6'
    }

    return errors
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate()
    if (!isEmpty(errors)) {
      this.setState({ errors: { ...this.state.errors, ...errors } })
      return
    }
    const data = { ...this.state }
    delete data.errors
    this.props.signup(data)
  }

  handleChange = (field, e) => {
    clearTimeout(this.timers[field])
    const value = e.target.value.trim()
    this.setState({ [field]: value })
    this.timers[field] = setTimeout(() => {
      this.triggerChange(field, value)
    }, WAIT_INTERVAL)
  }

  triggerChange = (field, value) => {
    let error = ''
    if (field === 'userName' && !value) {
      error = '用户名不能为空'
    }
    if (field === 'phoneNum' && !/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
      error = '手机号格式不正确'
    }
    if (field === 'password' && value.length < 6) {
      error = '密码长度不能小于6'
    }
    if (field === 'smsCode' && !value) {
      error = '验证码不能为空'
    }
    this.setState({ errors: { ...this.state.errors, [field]: error } })
  }

  render() {
    const { phoneNum, errors } = this.state
    const { classes: s } = this.props
    const fields = [
      { label: '用户名', name: 'userName' },
      { label: '手机号', name: 'phoneNum' },
      { label: '验证码', name: 'smsCode' },
      { label: '密码', name: 'password' }
    ]
    const formItems = fields.map(field => {
      return (
        <div key={field.name} className={s.row}>
          <TextField
            error={errors[field.name] ? true : false}
            value={this.state[field.name]}
            fullWidth
            onChange={this.handleChange.bind(this, field.name)}
            margin="dense"
            label={field.label}
            type={field.name === 'password' ? 'password' : null}
            helperText={<span className={s.error}>{errors[field.name]}</span>}
          />
          {field.name === 'smsCode' ? (
            <SmsSendContainer
              phoneNumIsValid={phoneNum && !errors.phoneNum}
              phoneNum={phoneNum}
            />
          ) : null}
        </div>
      )
    })
    return (
      <Layout title="注册">
        <div>
          {formItems}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.handleSubmit}
          >
            注册
          </Button>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(Signup)
