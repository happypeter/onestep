import React from 'react'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #b2ebf2;
  text-align: center;
`

const Info = styled.div`
  margin: 20%;
  font-size: 100px;
  font-weight: bolder;
`

export default () => (
  <Wrap>
    <Info>404</Info>
    <Footer />
  </Wrap>
)
