import React from 'react'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #B2EBF2;
  text-align: center;
`
const Info = styled.div`
  margin: 20%;
  font-size: 80px;
  font-weight: bold;
`

export default (props) => {
  if (props.error) {
    return (
      <Wrap>
        <Info>Error!</Info>
        <Footer />
      </Wrap>
    )
  } else if (props.pastDelay) {
    return (
      <Wrap>
        <Info>信息请求中...</Info>
        <Footer />
      </Wrap>
    )
  } else {
    return null
  }
}
