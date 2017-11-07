import React from 'react'
import TopHeader from '../Header/TopHeader'
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

export default props => (
  <Wrap>
    <TopHeader />
    购买过的课程{props.courses}
    <br />
    好奇猫会员到期日{props.latestExpireDate}
    <br />
    已在好奇猫为自己投资{props.total}元
    <br />
    <Footer />
  </Wrap>
)
