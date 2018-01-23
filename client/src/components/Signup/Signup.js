import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import SmsSendContainer from '../common/smsSend/SmsSendContainer'
import WeChat from '../oauth/WeChat'
import TextField from 'material-ui/TextField'
import {
  Wrap,
  Content,
  Container,
  Title,
  Form,
  ActionButton,
  Row,
  Error,
} from '../oauth/FormStyle'
import keys from 'lodash.keys'
import isEmpty from 'lodash.isempty'
const WAIT_INTERVAL = 1000

class Signup extends Component {
  state = {
    username: '',
    phoneNum: '',
    password: '',
    smsCode: '',
    errors: {},
  }

  componentWillMount = () => {
    this.timers = {}
  }

  componentWillUnmount = () => {
    this.clearTimers()
  }

  clearTimers = () => {
    let items = keys(this.timers)
    for(let i = 0; i < items.length; i++) {
      clearTimeout(this.timers[items[i]])
    }

    this.timers = null
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
    const errors = this.validate()
    if (!isEmpty(errors)) {
      this.setState({errors: {...this.state.errors, ...errors}})
      return
    }
    const data = {...this.state}
    delete data.errors
    this.props.signup(data, this.props.history)
  }

  handleChange = (field, e) => {
    clearTimeout(this.timers[field])
    const value = e.target.value.trim()
    this.setState({[field]: value})
    this.timers[field] = setTimeout(() => {
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

  render() {
    const {phoneNum, errors} = this.state
    const fields = [
      {label: '用户名', name: 'username'},
      {label: '手机号', name: 'phoneNum'},
      {label: '验证码', name: 'smsCode'},
      {label: '密码', name: 'password'},
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
            type={field.name === 'password' ? 'password' : null}
            helperText={<Error>{errors[field.name]}</Error>}
          />
          {field.name === 'smsCode' ? (
            <SmsSendContainer
              phoneNumIsValid={phoneNum && !errors.phoneNum}
              phoneNum={phoneNum}
              checkUserExist={false}
            />
          ) : null}
        </Row>
      )
    })
    return (
      <Wrap>
        <TopHeader />
        <Content>
          <Container>
            <Title>注册</Title>
            <Form onSubmit={this.handleSubmit}>
              {formItems}
              <ActionButton type="submit">注册</ActionButton>
            </Form>
            <WeChat />
          </Container>
        </Content>
        <Footer />
      </Wrap>
    )
  }
}

export default Signup
