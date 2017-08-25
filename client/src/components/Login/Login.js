import React, { Component } from 'react'
import './login.css'

class Login extends Component {

  handleClick = () => {
   console.log("handleClick");
   this.props.onClick()
  }

  render () {
    return (
      <div className='home'>
        <button onClick={this.handleClick} className='fake-code'>点击假装微信扫码登录</button>
      </div>
    )
  }
}

export default Login
