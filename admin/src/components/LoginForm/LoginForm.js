import React from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import styled from 'styled-components'
import Settings from '../../settings'
const FormItem = Form.Item

const StyledButton = styled(Button)`
  width: 100%;
`

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (
          values.userName !== Settings.users.userName ||
          values.password !== Settings.users.password
        ) {
          return message.error('用户名或密码错误')
        }
        this.props.onLogin()
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input
              prefix={<Icon type="user" style={{fontSize: 13}} />}
              placeholder="Username"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock" style={{fontSize: 13}} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>
        <FormItem>
          <StyledButton
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </StyledButton>
        </FormItem>
      </Form>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm)

export default LoginForm
