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
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
    padding: 1em 4em;
  }
`

const CourseCard = styled(Link)`
  margin: 1em;
  width: 100%;
  flex-grow: 0;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-align: left;
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
  }

  span {
    font-size: 14px;
    padding:5px 0 5px 15px;
    display: inline-block;
    font-weight: 200;
    color: rgb(76, 87, 101);
  }

  @media (min-width: 600px) {
    width: calc(50% - 4em)
  }

  @media (min-width: 1024px) {
    width: calc(33.33333% - 2em)
  }
`

class CourseList extends Component {
  render () {
    let { courses, status } = this.props

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
          <CourseCard to={`${item.link}`} key={item.key}>
            <span>{item.publishedOn}</span>
            <img src={`${item.cover}`} alt='cover' className='cover' />
            <p>{item.title}</p>
          </CourseCard>
        ))
        return (
          <div>
            <Title>最新发布</Title>
            <CourseListWrap>
              { catalogues }
            </CourseListWrap>
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
}

export default CourseList
