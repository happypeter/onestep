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
  font-size: 30px;
  font-weight: bold;
`

export default props => {
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
      </Wrap>
    )
  } else {
    return null
  }
}
