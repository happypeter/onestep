import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import {Container, Title, Form, Image, ActionButton, Switch} from './FormStyle'

class ExistedAccount extends Component {
  state = {
    phoneNum: '',
    password: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {...this.state, user: {...this.props.user}}
    this.props.oauthBinding(data, this.props.history)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleClick = () => {
    this.props.switchTab()
  }

  render() {
    const {user} = this.props.user
    return (
      <Container>
        <Title>绑定已有账号</Title>
        <Form onSubmit={this.handleSubmit}>
          <Image src={user.headimgurl} />
          <div>{user.nickname}</div>
          <TextField
            style={{width: '100%'}}
            name="phoneNum"
            value={this.state.phoneNum}
            onChange={this.handleChange}
            margin="dense"
            label="手机号"
            helperText={this.state.phoneNumErr}
          />
          <TextField
            style={{width: '100%'}}
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            margin="dense"
            label="密码"
            type="password"
            helperText={this.state.passwordErr}
          />
          <ActionButton type="submit">完成注册</ActionButton>
        </Form>
        <Switch onClick={this.handleClick}>绑定新账号</Switch>
      </Container>
    )
  }
}

export default ExistedAccount
