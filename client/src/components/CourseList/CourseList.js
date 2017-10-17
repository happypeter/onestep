import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import './course-list.css'

const Title = styled.div`
  color: #6d6d6d;
  line-height: 1.8;
  width: 139px;
  margin: 0px auto;
  text-align: center;
  font-size: 1.5em;
  font-weight: 600;
  border-bottom: 3px solid rgb(0, 188, 212);
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0px auto;
  padding-top: 20px;
  padding-bottom: 20px;
`

const CourseCard = styled(Link)`
  margin: 20px;
  width: 100%;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-align: center;
  text-decoration: none;

  img {
    width: 100%;
    display: block;
  }

  p {
    border-top: 1px solid rgb(226, 226, 226);
    margin: 0;
    padding: 15px;
    color: rgb(76, 87, 101);
    font-size: 17px;
    text-align: center;
  }

  @media (min-width: 600px) {
    width: calc(50% - 40px)
  }

  @media (min-width: 900px) {
    width: calc(33.33333% - 40px)
  }
`

class CourseList extends Component {
  render () {
    let courses = this.props.courses.map((item, i) => (
      <CourseCard to={`/${item.title}`} key={i}>
        <img src={`${item.post}`} alt='poster' className='poster' />
        <p>{item.title}</p>
      </CourseCard>
    ))

    return (
      <div>
        <Title>已发布课程</Title>
        <CourseListWrap>
          {courses}
        </CourseListWrap>
      </div>
    )
  }
}

export default CourseList
