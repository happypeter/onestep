import React from 'react'
import CourseList from '../../containers/CourseListContainer'
import Header from '../Header/Header'
import styled from 'styled-components'
import Loadable from 'react-loadable'
import LoadingComponent from '../common/Loading'

export default () => (
  <HomeWrap>
    <Header />
    <CourseList />
    <AsyncAboveFooter />
    <AsyncFooter />
  </HomeWrap>
)

const AsyncAboveFooter = Loadable({
  loader: () => import('../Footer/AboveFooter'),
  loading: LoadingComponent,
  delay: 300
})

const AsyncFooter = Loadable({
  loader: () => import('../Footer/Footer'),
  loading: LoadingComponent,
  delay: 300
})

const HomeWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  text-align: center;
`
