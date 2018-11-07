import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash.isempty'
import Layout from '../shared/AuthFormLayout'
import { ERROR_COLOR } from '../../constants/GlobalStyle'

const styles = theme => ({
  error: { color: ERROR_COLOR },
  notice: {
    fontSize: 14,
    lineHeight: 1.8,
    margin: '24px 0'
  }
})

class Login extends Component {
  state = {
    account: '',
    password: '',
    errors: {}
  }

  handleSubmit = e => {
    e.preventDefault()
    const { account, password } = this.state
    const errors = {}
    if (!account) {
      errors.account = '不能为空'
    }
    if (!password) {
      errors.password = '密码错误'
    }
    if (!isEmpty(errors)) {
      this.setState({ errors: { ...this.errors, ...errors } })
      return
    }

    this.props.login({ account, password })
  }

  handleChange = (field, e) => {
    const value = e.target.value.trim()
    this.setState({ [field]: value })
  }

  render() {
    const { account, password, errors } = this.state
    const { classes: s } = this.props
    return (
      <Layout title="登录">
        <div className={s.notice}>
          好奇猫老用户：请您重新注册账号再登录本站。若您之前购买过课程，请把注册使用的手机号发给
          Peter，之后给您开通课程观看权限。
        </div>
        <div>
          <TextField
            style={{ width: '100%' }}
            value={account}
            onChange={this.handleChange.bind(this, 'account')}
            margin="dense"
            label="手机号"
            helperText={<span className={s.error}>{errors.account}</span>}
          />

          <TextField
            style={{ width: '100%' }}
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            margin="dense"
            label="密码"
            type="password"
            helperText={<span className={s.error}>{errors.account}</span>}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(Login)
