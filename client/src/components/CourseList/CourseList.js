import React from 'react'
import CourseCard from '../common/CourseCard'
import styled from 'styled-components'

export default ({courses, status}) => {
  switch (status) {
    case 'LOADING': {
      return (
        <div>
          <Title>信息请求中...</Title>
        </div>
      )
    }
    case 'SUCCESS': {
      let catalogues = courses.map((item, i) => (
        <CourseCard
          key={item.key}
          link={item.link}
          publishedAt={item.publishedAt}
          cover={item.cover}
          title={item.title}
        />
      ))
      return (
        <div>
          <Title>最新发布</Title>
          <CourseListWrap>{catalogues}</CourseListWrap>
        </div>
      )
    }
    case 'FAILURE': {
      return (
        <div>
          <Title>信息加载失败</Title>
        </div>
      )
    }
    default: {
      throw new Error('unexpected status ' + status)
    }
  }
}

const Title = styled.div`
  margin: 0px auto;
  text-align: center;
  font-size: 2.5em;
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px auto;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
    padding: 1em 4em;
  }
`
