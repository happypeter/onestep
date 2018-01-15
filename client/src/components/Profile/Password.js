import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import {
  Container,
  Title,
  Form,
  ActionButton,
  Row,
  Error,
} from '../oauth/FormStyle'
import isEmpty from 'lodash.isempty'

const WAIT_INTERVAL = 1000

class Password extends Component {
  state = {
    old: '',
    new: '',
    consistent: '',
    errors: {},
  }

  validate = () => {
    return
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate()
    if (!isEmpty(errors)) {
      this.setState({errors: {...this.state.errors, ...errors}})
      return
    }
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
    if (field === 'old' && !value) {
      error = '旧密码不能为空'
    }
    this.setState({errors: {...this.state.errors, [field]: error}})
  }

  render() {
    const {phoneNum, errors} = this.state
    const fields = [
      {label: '旧密码', name: 'old'},
      {label: '新密码', name: 'new'},
      {label: '确认新密码', name: 'confirm'},
    ]
    const formItems = fields.map(field => {
      return (
        <Row key={field.name}>
          <TextField
            error={errors[field.name] ? true : false}
            style={{width: '100%'}}
            value={this.state[field.name]}
            onChange={this.handleChange.bind(this, field.name)}
            margin="dense"
            label={field.label}
            type='password'
            helperText={<Error>{errors[field.name]}</Error>}
          />
          {field.name === 'old' ? <div>忘记密码</div> : null}
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
        </Form>
      </Container>
    )
  }
}

export default Password
