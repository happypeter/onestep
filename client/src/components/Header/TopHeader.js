import React from 'react'
import styled from 'styled-components'

const TopHeaderWrap = styled.div`
  background-color: #00BCD4;
  display: flex;
  justify-content: space-between;
`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
`

const Button = styled.div`
  font-size: 1em;
  padding: 0.5em;
  color: white;
  line-height: 2;
  opacity: 0.8;
  transition: all 0.5s ease;
  font-weight: 600;
  text-decoration: none;
  @media (min-width: 850px) {
    font-size: 1.2em;
    padding: 0.5em 1.3em;
  }
`

export default () => (
  <TopHeaderWrap>
    <Button>
      首页
    </Button>
    <SideButtonsWrap>
      <Button>注册</Button>
      <Button>登录</Button>
      <Button>微信登录</Button>
    </SideButtonsWrap>
  </TopHeaderWrap>
)
