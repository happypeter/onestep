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

const LoadingComponent = (props) => {
  if (props.error) {
    return (
      <Wrap>
        <div>Error!</div>
        <Footer />
      </Wrap>
    )
  } else if (props.pastDelay) {
    return (
      <Wrap>
        <div>信息请求中...</div>
        <Footer />
      </Wrap>
    )
  } else {
    return null
  }
}

export default LoadingComponent
