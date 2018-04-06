import React from 'react'
import styled from 'styled-components'

export default ({ title, intro }) => (
  <MsgIntro>
    <Title>{title}</Title>
    <Msg>{intro}</Msg>
  </MsgIntro>
)

const MsgIntro = styled.div`
  margin: 24px 0;
  padding: 8px 0;
  padding-left: 24px;
  border-left: 6px solid #00bcd4;
`

const Title = styled.div`
  margin-bottom: 24px;
  font-size: 24px;
  color: #212121;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`

const Msg = styled.div`
  font-size: 16px;
  color: #666;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`
