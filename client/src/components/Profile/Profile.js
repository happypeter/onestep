import React, { Component } from 'react'
import styled from 'styled-components'
import CourseCard from '../common/CourseCard'
import MemberShip from './MemberShip'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchCoursesIfNeeded()
  }

  render() {
    const { courses, anyCourse, isMember } = this.props
    const pageContent = (
      <div>
        <ContentWrap>
          <SubTitle>课程</SubTitle>
          {anyCourse ? (
            <CourseListWrap>
              {courses.map(course => (
                <CourseCard
                  key={course.uid}
                  uid={course.uid}
                  title={course.title}
                />
              ))}
            </CourseListWrap>
          ) : (
            <div>还没有购买过课程</div>
          )}

          <MemberShip isMember={isMember} />
        </ContentWrap>
      </div>
    )

    return <Wrap>{pageContent}</Wrap>
  }
}

export default Profile

const Wrap = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`

const ContentWrap = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const SubTitle = styled.div`
  color: #212121;
  width: 102px;
  margin: 0px auto;
  margin-top: 43px;
  margin-bottom: 23px;
  text-align: center;
  font-size: 2em;
  border-bottom: 7px solid #00bcd4;
  @media (min-width: 1024px) {
    margin-top: 87px;
    margin-bottom: 47px;
  }
`

const CourseListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px auto;
  @media (min-width: 1024px) {
    padding: 1em 4em;
  }
`
