import React, { Component } from 'react'
import CourseCard from '../common/CourseCard'
import styled from 'styled-components'

class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCoursesIfNeeded()
  }

  render() {
    const { all, isFetching } = this.props.course
    if (isFetching) return <Title>信息请求中...</Title>
    let courseList = all.map(item => (
      <CourseCard key={item._id} uid={item.uid} title={item.title} />
    ))

    return (
      <div>
        <Title>最新发布</Title>
        <CourseListWrap>{courseList}</CourseListWrap>
      </div>
    )
  }
}

export default CourseList

const Title = styled.div`
  text-align: center;
  font-size: 2.5em;
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
`
