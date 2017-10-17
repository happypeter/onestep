import React from 'react'
import { Link } from 'react-router-dom'
import CourseList from '../../containers/CourseListContainer'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const HomeWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #B2EBF2;
  text-align: center;
`

const Button = styled(Link)`
  background-color: #FF5252;
  margin: 20% auto 10% auto;
  width: 15%;
  padding: 0 10px;
  border: none;
  line-height: 30px;
  outline: none;
  color: white;
  text-decoration: none;
  border-radius: 50px;
`

export default () => (
  <HomeWrap>
    <Header />
    <Button to='/Login'>微信登录</Button>
    <CourseList />
    <Footer />
  </HomeWrap>
)
