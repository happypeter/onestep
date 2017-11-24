import React from 'react'
import styled from 'styled-components'

const SloganWrap = styled.div`
  background-color: #00BCD4;
  margin-bottom: 40px;
  padding: 50px 1.5em 10px;
  @media (min-width: 1024px) {
    background-image: url(./reactHexagon.svg);
    background-position: right 6em center;
    background-size: 277px;
    background-repeat: no-repeat;
    height: 297px;
    padding-right: 10px;
    padding-left: 6em;
    display: flex;
    align-items: center;
  }
`
const TextWrap = styled.div`
  max-width: 1000px;
  margin: 0px auto;
  color: #FFFFFF;
  @media (min-width: 1024px) {
    text-align: left;
    margin-left: 10px;
  }
`

const H1Wrap = styled.h1`
  font-family: sans-serif;
  font-size: 2.5em;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 30px;
  line-height: 1.1;
  letter-spacing: -1px;
  @media (min-width: 1024px) {
    font-size: 50px;
  }
`

const H3Wrap = styled.h3`
  font-weight: 200;
  font-size: 1em;
  margin-bottom: 50px;
  line-height: 2em;
  opacity: 0.84;
`

export default () => (
  <SloganWrap>
    <TextWrap>
      <H1Wrap>为开发者而生</H1Wrap>
      <H3Wrap>好奇猫的每个课程都是《做一个东西的一二三四步》，为你踩坑。
        <br />
        我自己写代码上传到 github ，然后通过微视频的形式讲每一个 diff
        <br />
        的背后故事给你听。通过会员订阅的服务形式，好奇猫要做一个
        <br />
        懂你的视频资源站。
      </H3Wrap>
    </TextWrap>
  </SloganWrap>
)
