import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    padding: 1em 4em;
  }
`

const CourseCard = styled(Link)`
  margin: 2em;
  width: 100%;
  flex-grow: 1;
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
    width: calc(50% - 4em)
  }

  @media (min-width: 1024px) {
    width: calc(33.33333% - 4em)
  }
`

class CourseList extends Component {
  render () {
    let courses = this.props.courses.map((item, i) => (
      <CourseCard to={`course/${item.title}`} key={i}>
        <img src={`${item.post}`} alt='poster' className='poster' />
        <p>{item.title}</p>
      </CourseCard>
    ))

    return (
      <div>
        <Title>最新发布</Title>
        <CourseListWrap>
          {courses}
        </CourseListWrap>
      </div>
    )
  }
}

export default CourseList
