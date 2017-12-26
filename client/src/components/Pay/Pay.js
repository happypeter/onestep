import React from 'react'
import src from '../../assets/pay.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default props => (
  <ContentWrap>
    <Title>购买步骤</Title>
    <CardWrap>
      <img src={src} alt={'wechat: happypeter1983'} />
      <Instr>
        <p>添加 Peter 的微信</p>
        <p>通过微信支付课程费用{props.location.state ? `${props.location.state.price}元` : null}</p>
        <p>把您在本站
          <LinkWrap to={`/signup`}> 注册 </LinkWrap>
          用户名发送给 happypeter 就行了</p>
      </Instr>
    </CardWrap>
  </ContentWrap>
)

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Title = styled.div`
  margin: 0 auto;
  margin-top: 105px;
  font-size: 40px;
  color: #212121;
`

const CardWrap = styled.form`
  min-height: 450px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px #888888;
  border-top: 2.5em solid #00BCD4;
  text-align: center;
  margin-top: 5%;
  padding: 0 60px;
  @media (min-width: 1024px) {
    width: 544px;
    margin: 73px auto;
    margin-bottom: 280px;
    img {
      margin: 37px 110px 0;
    }
  }
`

const Instr = styled.div`
  margin: 37px auto 49px auto;
`

const LinkWrap = styled(Link)`
  text-decoration: none;
  color: inherit;
`
