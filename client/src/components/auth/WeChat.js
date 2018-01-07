import React, {Component} from 'react'
import styled from 'styled-components'
import wechat from '../../assets/wechat.svg'

class WeChat extends Component {
  handleClick = () => {}

  render() {
    return (
      <Wrap>
        <Line />
        <Desc>第三方账号登录</Desc>
        <ImageWrap onClick={this.handleClick}>
          <Image src={wechat} />
        </ImageWrap>
      </Wrap>
    )
  }
}

export default WeChat

const Wrap = styled.div`
  padding: 16px 0;
`

const Line = styled.div`
  border: 1px solid #f8f8f8;
`
const Desc = styled.div`
  font-size: 14px;
  color: #b4b4b4;
  width: 150px;
  height: 24px;
  line-height: 24px;
  margin: -12px auto 0;
  background-color: #fff;
  text-align: center;
`

const ImageWrap = styled.div`
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 23px;
  background: #f1f1f1;
  margin: 16px auto 0;
  &:hover {
    cursor: pointer;
  }
`

const Image = styled.img`
  width: 23px;
  height: 23px;
  display: block;
`
