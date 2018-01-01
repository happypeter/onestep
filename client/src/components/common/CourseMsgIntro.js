import React from 'react'
import styled from 'styled-components'

export default ({title, intro}) => (
  <MsgIntro>
    <Title>{title}</Title>
    <Msg>{intro}</Msg>
  </MsgIntro>
)

const MsgIntro = styled.div`
  display: flex;
  flex-direction: column;
  color: #212121;
  margin: 0px auto;
  margin-top: 44px;
  margin-left: 0;
  margin-right: 10px;
  padding: 0.5em 1em;
  padding-left: 25px;
  margin-bottom: 14px;
  font-size: 1em;
  border-left: 7px solid #00BCD4;
  @media (min-width: 1024px) {
    padding-right: 30px;
  }
`

const Msg = styled.div`
  color: #212121;
  font-size: 14px;
`

const Title = styled.div`
  color: #212121;
  margin-bottom: 21px;
  font-size: 28px;
`
