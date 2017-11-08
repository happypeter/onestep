import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
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

export default ({courses, latestExpireDate, total, status}) => {
  switch (status) {
    case 'LOADING': {
      return (
        <Wrap>
          <TopHeader />
          <div>信息请求中...</div>
          <Footer />
        </Wrap>
      )
    }
    case 'SUCCESS': {
      return (
        <Wrap>
          <TopHeader />
          购买过的课程{courses}
          <br />
          好奇猫会员到期日{latestExpireDate}
          <br />
          已在好奇猫为自己投资{total}元
          <br />
          <Footer />
        </Wrap>
      )
    }
    case 'FAILURE': {
      return (
        <Wrap>
          <TopHeader />
          <div>信息加载失败</div>
          <Footer />
        </Wrap>
      )
    }
    default: {
      throw new Error('unexpected status ' + status)
    }
  }
}
