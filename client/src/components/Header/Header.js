import React from 'react'
import styled from 'styled-components'

const HeaderWrap = styled.div`
  background-color: #00BCD4;
  display: flex;
  justify-content: space-between;
`

const Button = styled.div`
  color: white;
  line-height: 2;
  padding: 0.5em 1.3em;
  opacity: 0.8;
  transition: all 0.5s ease;
  font-weight: 600;
  font-size: 1.2em;
  text-decoration: none;
`

export default () => (
  <HeaderWrap>
    <Button>
      首页
    </Button>
    <div style={{display: 'flex', flexDirection: 'flex-end'}}>
      <Button>
        注册
      </Button>
      <Button>
        登录
      </Button>
    </div>
  </HeaderWrap>
)
