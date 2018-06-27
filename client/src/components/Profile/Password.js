import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {
  Container,
  Title,
  Form,
  ActionButton,
  Row,
  Error
} from '../oauth/FormStyle'
import isEmpty from 'lodash.isempty'
import { LinkWrap } from '../oauth/FormStyle'

class Password extends Component {
  state = {
    oldOne: '',
    newOne: '',
    consistent: '',
    errors: {}
  }

  validate = () => {
    const { oldOne, newOne, consistent } = this.state
    const errors = {}
    if (!oldOne || oldOne.length < 6) {
      errors.oldOne = '密码不能为空'
    }
    if (!newOne || newOne.length < 6) {
      errors.newOne = '密码长度不能小于6'
    }
    if (newOne !== consistent) {
      errors.consistent = '两次输入的密码不一致'
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
    const { oldOne, newOne } = this.state
    this.props.modifyPassword({ oldOne, newOne })
  }

  handleChange = (field, e) => {
    const value = e.target.value.trim()
    this.setState({ [field]: value })
  }

  render() {
    const { errors } = this.state
    const fields = [
      { label: '旧密码', name: 'oldOne' },
      { label: '新密码', name: 'newOne' },
      { label: '确认新密码', name: 'consistent' }
    ]
    const formItems = fields.map(field => {
      return (
        <Row key={field.name}>
          <TextField
            error={errors[field.name] ? true : false}
            style={{ width: '100%' }}
            value={this.state[field.name]}
            onChange={this.handleChange.bind(this, field.name)}
            margin="dense"
            label={field.label}
            type="password"
            helperText={<Error>{errors[field.name]}</Error>}
          />
        </Row>
      )
    })

    return (
      <Container>
        <Title>修改密码</Title>
        <Form onSubmit={this.handleSubmit}>
          {formItems}
          <ActionButton raised type="submit">
            确定
          </ActionButton>
          <LinkWrap to="/reset-password">忘记密码</LinkWrap>
        </Form>
      </Container>
    )
  }
}

export default Password
