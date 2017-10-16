import React from 'react'
import styled from 'styled-components'

const FooterWrap = styled.div`
  background-color: rgb(33, 33, 33);
  text-align: center;
  padding: 48px 24px;
  color: rgba(255, 255, 255, 0.54);
`
export default () => (
  <FooterWrap>
    <div style={{fontSize: '1.1em'}}>
      欢迎添加 Peter 的微信：happypeter1983
    </div>
    <div style={{fontSize: '0.9em', marginTop: '20px'}}>
      冀ICP备15007992号-3
    </div>
  </FooterWrap>
)
