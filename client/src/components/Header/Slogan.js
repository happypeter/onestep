import React from 'react'
import styled from 'styled-components'

const SloganWrap = styled.div`
  background-color: #00BCD4;
  margin-bottom: 40px;
  padding: 50px 1.5em 10px;
`
export default () => (
  <SloganWrap>
    <h1 style={{ maxWidth: '1000px', margin: '0px auto', fontFamily: 'sans-serif', fontSize: '35px', fontWeight: 400, marginTop: '0px', marginBottom: '30px', lineHeight: '1.1', letterSpacing: '-1px', color: 'rgb(85, 85, 85)' }}>
      欢迎来到好奇猫
    </h1>
    <h3 style={{ maxWidth: '1000px', margin: '0px auto', fontWeight: 200, fontSize: '1.35em', marginBottom: '50px', lineHeight: '2em', color: 'rgb(255, 255, 255)' }}>
      节省自学时间
    </h3>
  </SloganWrap>
)
