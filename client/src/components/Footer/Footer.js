import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.div`
  background-color: rgb(33, 33, 33);
  text-align: center;
  padding: 12px 6px;
  color: rgba(255, 255, 255, 0.54);
  @media (min-width: 400px) {
    padding: 48px 24px;
  }
`

const ICPWrap = styled.div`
  font-size: 0.5em;
  margin-top: 10px;
  @media (min-width: 400px) {
    font-size: 0.9em;
    margin-top: 20px;
  }
`

const WelcomeWrap = styled.div`
  font-size: 0.4em;
  @media (min-width: 400px) {
    font-size: 1.1em;
  }
`

export default () => (
  <FooterWrap>
    <WelcomeWrap>
      欢迎添加 Peter 的微信：happypeter1983
    </WelcomeWrap>
    <ICPWrap>
      冀ICP备15007992号-3
    </ICPWrap>
  </FooterWrap>
)
