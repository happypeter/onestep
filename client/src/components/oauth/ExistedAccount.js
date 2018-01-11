import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import {
  Container,
  Title,
  Form,
  Image,
  ActionButton,
  Switch,
  Error,
} from './FormStyle'

class ExistedAccount extends Component {
  state = {
    phoneNum: '',
    password: '',
    errors: {},
  }

  validate = () => {
    const {phoneNum, password} = this.state
    const errors = {}
    if (!phoneNum || !/^1[3|4|5|7|8][0-9]\d{8}$/.test(phoneNum)) {
      errors.phoneNum = '手机号格式不正确'
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
    const data = {...this.state, user: {...this.props.user}, existed: true}
    this.props.oauthBinding(data, this.props.history)
  }

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    })
  }

  handleClick = () => {
    this.props.switchTab()
  }

  render() {
    const {user} = this.props
    const {phoneNum, password, errors} = this.state

    return (
      <Container>
        <Title>绑定已有账号</Title>
        <Form onSubmit={this.handleSubmit}>
          <Image src={user.headimgurl} />
          <div>{user.nickname}</div>
          <TextField
            style={{width: '100%'}}
            value={phoneNum}
            onChange={this.handleChange.bind(this, 'phoneNum')}
            margin="dense"
            label="手机号"
            helperText={<Error>{errors.phoneNum}</Error>}
          />
          <TextField
            style={{width: '100%'}}
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            margin="dense"
            label="密码"
            type="password"
            helperText={<Error>{errors.password}</Error>}
          />
          <ActionButton type="submit">完成注册</ActionButton>
        </Form>
        <Switch onClick={this.handleClick}>绑定新账号</Switch>
      </Container>
    )
  }
}

export default ExistedAccount
