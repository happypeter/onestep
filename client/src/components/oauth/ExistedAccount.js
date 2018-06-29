import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {
  Container,
  Title,
  Form,
  Image,
  ActionButton,
  Switch,
  Error,
  LinkWrap
} from './FormStyle'

class ExistedAccount extends Component {
  state = {
    account: '',
    password: '',
    errors: {}
  }

  validate = () => {
    const { account, password } = this.state
    const errors = {}
    if (!account) {
      errors.account = '不能为空'
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
      this.setState({ errors: { ...this.state.errors, ...errors } })
      return
    }
    const data = { ...this.state, user: { ...this.props.user }, existed: true }
    this.props.oauthBinding(data, this.props.history)
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleClick = () => {
    this.props.switchTab()
  }

  render() {
    const { user } = this.props
    const { account, password, errors } = this.state

    return (
      <Container>
        <Title>绑定已有账号</Title>
        <Form onSubmit={this.handleSubmit}>
          <Image src={user.headimgurl} />
          <div>{user.nickname}</div>
          <TextField
            style={{ width: '100%' }}
            value={account}
            onChange={this.handleChange.bind(this, 'account')}
            margin="dense"
            label="用户名或手机号"
            helperText={<Error>{errors.account}</Error>}
          />
          <TextField
            style={{ width: '100%' }}
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            margin="dense"
            label="密码"
            type="password"
            helperText={<Error>{errors.password}</Error>}
          />
          <ActionButton type="submit">完成注册</ActionButton>
          <LinkWrap to="/reset-password">忘记密码</LinkWrap>
        </Form>
        <Switch onClick={this.handleClick}>绑定新账号</Switch>
      </Container>
    )
  }
}

export default ExistedAccount
