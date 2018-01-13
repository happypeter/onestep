import React, {Component} from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import {
  Container,
  Title,
  Form,
  Image,
  ActionButton,
  Switch,
  Row,
  Error,
} from '../oauth/FormStyle'

const WAIT_INTERVAL = 1000

class ResetPassword extends Component {
  state = {
    smsCode: '',
    password: '',
    errors: {},
  }

  validate = () => {
    const {smsCode, password} = this.state
    const errors = {}
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
    if (Object.keys(errors).length) {
      this.setState({errors: {...this.state.errors, ...errors}})
      return
    }
    const {smsCode, password} = this.state
    const phoneNum = this.props.auth.currentUser.phoneNum
    this.props.resetPassword({phoneNum, smsCode, password})
  }

  handleChange = (field, e) => {
    const value = e.target.value.trim()
    this.setState({[field]: value})
    this.timer = setTimeout(() => {
      this.triggerChange(field, value)
    }, WAIT_INTERVAL)
  }

  triggerChange = (field, value) => {
    let error = ''
    if (field === 'password' && value.length < 6) {
      error = '密码长度不能小于6'
    }
    if (field === 'smsCode' && !value) {
      error = '验证码不能为空'
    }
    this.setState({errors: {...this.state.errors, [field]: error}})
  }

  render() {
    const {errors, smsCode, password} = this.state
    const {isAuthenticated, currentUser} = this.props.auth

    return (
      <Container>
        <Title>修改密码</Title>
        <Form onSubmit={this.handleSubmit}>
          <TextField
            style={{width: '100%'}}
            disabled={true}
            margin="dense"
            defaultValue={currentUser.phoneNum}
            label="手机号"
          />
          <Row>
            <TextField
              style={{width: '100%'}}
              label="验证码"
              value={smsCode}
              margin="dense"
              onChange={this.handleChange.bind(this, 'smsCode')}
              helperText={<Error>{errors.smsCode}</Error>}
            />
            <SmsSendContainer
              phoneNumIsValid={true}
              phoneNum={currentUser.phoneNum}
            />
          </Row>
          <TextField
            style={{width: '100%'}}
            label="新密码"
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            type="password"
            margin="dense"
            helperText={<Error>{errors.password}</Error>}
          />

          <ActionButton raised type="submit">
            重置密码
          </ActionButton>
        </Form>
      </Container>
    )
  }
}

export default ResetPassword
