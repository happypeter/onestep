import React, { Component } from 'react'
import CourseCard from '../common/CourseCard'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCoursesIfNeeded()
  }

  render() {
    const { courses } = this.props
    let courseList = courses.map(item => (
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

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
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
