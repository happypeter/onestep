import React, { Component } from 'react'
import TopHeader from '../Header/TopHeader'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const CourseWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #B2EBF2;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10% 20%;
  text-align: center;
  .episode {
    margin: 10px;
    padding: 5px;
    text-decoration: none;
    color: #FFFFFF;
    background: #0097A7;
    border-radius: 40px;
  }
`
const IntroImg = styled.img`
  margin-bottom: 80px;
  border-radius: 20px;
`

// const EpisodesWrap = styled.div`
//   margin: 10px;
//   padding: 5px;
//   text-decoration: none;
//   color: #FFFFFF;
//   background: #0097A7;
//   border-radius: 40px;
// `

class Course extends Component {
  render () {
    let {src, episode} = this.props
    return (
      <div>
        <TopHeader />
        <CourseWrap>
          <IntroImg src={src} alt='poster' />
          <h2>章节列表</h2>
          {/* <EpisodesWrap> */}
            { episode }
          {/* </EpisodesWrap> */}
        </CourseWrap>
        <Footer />
      </div>
    )
  }
}

export default Course
