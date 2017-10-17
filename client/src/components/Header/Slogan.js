import React from 'react'
import styled from 'styled-components'

const SloganWrap = styled.div`
  background-color: #00BCD4;
  margin-bottom: 40px;
  padding: 50px 1.5em 10px;
  @media (min-width: 800px) {
    background-image: url(http://o84cbt6xd.bkt.clouddn.com/banner.png);
    background-position: right;
    background-size: 550px;
    background-repeat: no-repeat;
    height: 550px;
    display: flex;
    align-items: center;
  }
`

const H1Wrap = styled.h1`
  font-family: sans-serif;
  font-size: 35px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 30px;
  line-height: 1.1;
  letter-spacing: -1px;
  color: rgb(85, 85, 85);
`

const H3Wrap = styled.h3`
  font-weight: 200;
  font-size: 1.35em;
  margin-bottom: 50px;
  line-height: 2em;
  color: rgb(255, 255, 255);
`

export default () => (
  <SloganWrap>
    <div style={{ maxWidth: '1000px', margin: '0px auto' }}>
      <H1Wrap>
        欢迎来到好奇猫
      </H1Wrap>
      <H3Wrap>
        节省自学时间
      </H3Wrap>
    </div>
  </SloganWrap>
)
