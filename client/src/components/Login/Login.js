import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import TextField from 'material-ui/TextField'
import {
  Wrap,
  Content,
  Container,
  Title,
  Form,
  ActionButton,
  Error
} from '../oauth/FormStyle'
import isEmpty from 'lodash.isempty'
import BindPhoneNote from './BindPhoneNote'

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

    this.props.login({ account, password }, this.props.history)
  }

  handleChange = (field, e) => {
    const value = e.target.value.trim()
    this.setState({ [field]: value })
  }

  render() {
    const { account, password, errors } = this.state
    return (
      <Wrap>
        <TopHeader />
        <Content>
          <BindPhoneNote />
          <Container>
            <Title>登录</Title>
            <Form onSubmit={this.handleSubmit}>
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
              <ActionButton type="submit">登录</ActionButton>
            </Form>
          </Container>
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

export default Login
