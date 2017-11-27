import React from 'react'
import styled from 'styled-components'

const AboveWrap = styled.div`
  background-color: #00BCD4;
  display: flex;
  padding: 48px 24px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 1024px) {
    height: 245px;
    padding: 0 6em;
  }
`

const TextWrap = styled.div`
  margin: 0 auto;
  font-size: 1em;
  opacity: 0.52;
  font-family: ArialRoundedMTBold;
  color: #FFFFFF;
  @media (min-width: 1024px) {
    font-size: 3em;
  }
`

export default () => (
  <AboveWrap>
    <TextWrap>React</TextWrap>
    <TextWrap>Redux</TextWrap>
    <TextWrap>Git</TextWrap>
    <TextWrap>Atom</TextWrap>
    <TextWrap>Express</TextWrap>
  </AboveWrap>
)
