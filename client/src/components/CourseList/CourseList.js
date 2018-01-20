import React, {Component} from 'react'
import CourseCard from '../common/CourseCard'
import styled from 'styled-components'

class CourseList extends Component {
  componentDidMount() {
    if (!this.props.courses.length ) {
      this.props.fetchCourses()
    }
  }

  render() {
    const {items, isFetching} = this.props.courses
    if (isFetching) return <Title>信息请求中...</Title>
    let courseList = items.map((item, i) => (
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
        <CourseListWrap>{courseList}</CourseListWrap>
      </div>
    )
  }
}

export default CourseList

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
