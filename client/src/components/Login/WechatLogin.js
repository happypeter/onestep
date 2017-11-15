import React, { Component } from 'react'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const WechatLoginWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  background-color: #00BCD4;
  text-align: center;
`

const Mcode = styled.button`
  margin: 20% auto;
  height: 200px;
  width: 200px;
  background-color: #fff;
`

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled(Link)`
  background-color: #FF5252;
  width: 15%;
  padding: 0 10px;
  border: none;
  line-height: 30px;
  outline: none;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 0.5em;
  margin: 0 auto 20px auto;
  @media (min-width: 440px) {
    margin: -80px auto 0 auto;
  }
`

class WechatLogin extends Component {

  handleClick = () => {
  //  this.props.onClick()
  console.log("上线 MVP 以后再做")
  }

  render () {
    return (
      <WechatLoginWrap>
        <Mcode onClick={this.handleClick}>
          微信扫码登录
        </Mcode>
        <ButtonsWrap>
          <Button to={{
            pathname: '/login',
            state: { from: this.props.refererState }
          }}>
            账号登录
          </Button>

          <Button to={{
            pathname: '/signup',
            state: { from: this.props.refererState }
          }}>
            注册账号
          </Button>
        </ButtonsWrap>
        <Footer />
      </WechatLoginWrap>
    )
  }
}

export default WechatLogin
