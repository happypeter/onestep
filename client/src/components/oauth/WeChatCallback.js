import React, {Component} from 'react'
import {oauthWeChat, oauthBinding} from '../../redux/actions/authAction'
import {connect} from 'react-redux'
import TopHeader from '../Header/TopHeader'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class WeChatCallBack extends Component {
  state = {
    old: false,
    phoneNum: '',
    password: '',
    confirm: '',
  }

  componentWillMount = () => {
    const query = window.location.href.split('?')[1]
    if (query && query.split('&')) {
      const code = query.split('&')[0].slice(5)
      if (code) {
        if (!/MicroMessenger/i.test(window.navigator.userAgent)) {
          this.props.oauthWeChat({code, userAgent: 'PC'}, this.props.history)
        } else {
          this.props.oauthWeChat({code, userAgent: 'MicroMessenger'}, this.props.history)
        }
      }
    } else {
      this.props.history.push('/')
    }
  }

  handleClick = () => {
    this.setState({
      old: !this.state.old,
      phoneNum: '',
      password: '',
      confirm: '',
    })
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

  render() {
    const user = this.props.user
    if (!Object.keys(user).length) return null
    return (
      <Wrap>
        <TopHeader />
        <Content>
          {user && !this.state.old ? (
            <Container>
              <Title>绑定新账号</Title>
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
                <TextField
                  style={{width: '100%'}}
                  name="confirm"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  margin="dense"
                  label="确认密码"
                  type="password"
                  helperText={this.state.confirmErr}
                />
                <ActionButton type="submit">完成注册</ActionButton>
              </Form>
              <Switch onClick={this.handleClick}>绑定已有账号</Switch>
            </Container>
          ) : (
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
          )}
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

const mapStateToProps = state => ({
  user: state.weChatUser,
})

export default connect(mapStateToProps, {oauthWeChat, oauthBinding})(
  WeChatCallBack,
)

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Content = styled.div`
  flex-grow: 1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 32px auto;
  width: 100%;
  max-width: 390px;
  box-shadow: 2px 2px 5px #888888;
`

const Title = styled.div`
  background-color: #00bcd4;
  text-align: center;
  font-size: 18px;
  padding: 16px 0;
  color: #fff;
  letter-spacing: 1.5;
  font-weight: 500;
`

const Form = styled.form`
  padding: 16px 32px;
  text-align: center;
`

const Image = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 6px;
  margin: 0 auto 16px;
`

const ActionButton = styled(Button)`
  && {
    background-color: #00bcd4;
    color: #ffffff;
    width: 100%;
    margin-top: 1.5em;
  }
`

const Switch = styled.div`
  text-align: center;
  padding-bottom: 16px;
  color: #00bcd4;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`
