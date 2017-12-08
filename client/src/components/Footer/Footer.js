import React from 'react'
import styled from 'styled-components'

const Hero = styled.div`
  background-color: #2A3745;
`

const FooterWrap = styled.div`
  color: #FFFFFF;
  text-align: center;
  font-weight: 300;
  padding: 48px 24px;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
    height: 228px;
  }
`

const WelcomeWrap = styled.div`
  opacity: 0.85;
  font-size: 0.4em;
  @media (min-width: 1024px) {
    font-size: 1em;
  }
`

const ICPWrap = styled.div`
  opacity: 0.57;
  font-size: 0.5em;
  margin-top: 10px;
  @media (min-width: 1024px) {
    font-size: 0.88em;
    margin-top: 20px;
  }
`

export default () => (
  <Hero>
    <FooterWrap>
      <WelcomeWrap>
        欢迎添加 Peter 的微信：happypeter1983
      </WelcomeWrap>
      <ICPWrap>
        冀ICP备15007992号-3
      </ICPWrap>
    </FooterWrap>
  </Hero>
)
