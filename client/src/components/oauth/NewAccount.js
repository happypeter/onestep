import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {
  Container,
  Title,
  Form,
  Image,
  ActionButton,
  Switch,
  Row,
} from './FormStyle'
import styled from 'styled-components'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'

const WAIT_INTERVAL = 1000
const ENTER_KEY = 13

class NewAccount extends Component {
  state = {
    username: '',
    phoneNum: '',
    password: '',
    smsCode: '',
    errors: {},
  }

  componentWillMount = () => {
    this.timer = null
  }

  validate = () => {
    const {username, phoneNum, smsCode, password} = this.state
    const errors = {}
    if (!username) {
      errors.username = '用户名不能为空'
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
    //针对表单信息没有填写完整，就提交表单的情况
    const errors = this.validate()
    if (Object.keys(errors).length) {
      this.setState({errors: {...this.state.errors, ...errors}})
      return
    }

    const data = {...this.state, user: {...this.props.user}, existed: false}
    this.props.oauthBinding(data, this.props.history)
  }

  handleChange = (field, e) => {
    clearTimeout(this.timer)
    const value = e.target.value.trim()
    this.setState({[field]: value})
    this.timer = setTimeout(() => {
      this.triggerChange(field, value)
    }, WAIT_INTERVAL)
  }

  triggerChange = (field, value) => {
    let error = ''
    if (field === 'username' && !value) {
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
    this.setState({errors: {...this.state.errors, [field]: error}})
  }

  handleClick = () => {
    this.props.switchTab()
  }

  render() {
    const {user} = this.props
    const {username, phoneNum, smsCode, password, errors} = this.state

    return (
      <Container>
        <Title>绑定新账号</Title>
        <Form onSubmit={this.handleSubmit}>
          <Image src={user.headimgurl} />
          <div>{user.nickname}</div>
          <TextField
            style={{width: '100%'}}
            value={username}
            onChange={this.handleChange.bind(this, 'username')}
            margin="dense"
            label="用户名"
            helperText={<Error>{errors.username}</Error>}
          />
          <TextField
            style={{width: '100%'}}
            value={phoneNum}
            onChange={this.handleChange.bind(this, 'phoneNum')}
            margin="dense"
            label="手机号"
            helperText={<Error>{errors.phoneNum}</Error>}
          />
          {
            phoneNum && !errors.phoneNum ? (
              <Row>
                <TextField
                  value={smsCode}
                  onChange={this.handleChange.bind(this, 'smsCode')}
                  margin="dense"
                  placeholder="验证码"
                  helperText={<Error>{errors.smsCode}</Error>}
                />
                <SmsSendContainer
                  phoneNumIsValid={true}
                  phoneNum={phoneNum}
                  checkUserExist={false}
                />
              </Row>
            ) : null
          }

          <TextField
            style={{width: '100%'}}
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            margin="dense"
            label="密码"
            placeholder="密码长度不能小于6"
            type="password"
            helperText={<Error>{errors.password}</Error>}
          />
          <ActionButton type="submit">完成注册</ActionButton>
        </Form>
        <Switch onClick={this.handleClick}>绑定已有账号</Switch>
      </Container>
    )
  }
}

export default NewAccount

// p > span
const Error = styled.span`
  color: red;
`
