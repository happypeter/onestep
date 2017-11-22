import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #B2EBF2;
  text-align: center;
`
const LinkButton = styled(Link)`
  margin: 10px auto;
  padding: 5px;
  width: 10%;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: black;
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
          <div style={{ marginTop: '-150px', fontSize: '30px', fontWeight: 'bold' }}>个人中心</div>
          <div style={{ marginTop: '-150px', marginLeft: '40%', textAlign: 'left' }}>
            <div>购买过的课程{courses.map((course, i) => (<div key={i}>{course}</div>))}</div>
            <div>好奇猫会员到期日{latestExpireDate}</div>
            <div>已在好奇猫为自己投资{total}元</div>
          </div>
          <LinkButton to='/profile/settings'>设置</LinkButton>
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
