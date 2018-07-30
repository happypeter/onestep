import React from 'react'
import styled from 'styled-components'

export default () => (
  <Footer>
    <Company>秦皇岛好奇猫网络科技有限公司</Company>
    <ICP>冀ICP备15007992号-3</ICP>
  </Footer>
)

const Footer = styled.div`
  background-color: #2a3745;
  color: #ffffff;
  text-align: center;
  font-weight: 300;
  padding: 48px 24px;
`

const Company = styled.div`
  opacity: 0.85;
  font-size: 16px;
`

const ICP = styled.div`
  opacity: 0.6;
  font-size: 14px;
  margin-top: 16px;
`
