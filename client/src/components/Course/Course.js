import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import EpisodeItem from './EpisodeItem'
import CourseMsgIntro from '../common/CourseMsgIntro'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import BuyCourse from './BuyCourse'
import isEmpty from 'lodash.isempty'
import BuyCourseButton from './BuyCourseButton'

class Course extends Component {
  handleClick = () => {
    this.props.history.push('/login')
  }

  render() {
    const {
      name,
      courseName,
      intro,
      writing_to_who: writingToWho,
      learning_goal: learningGoal,
      price,
      content,
      _id
    } = this.props.course.item

    const { details } = this.props.profile
    let isPaid = false
    if (!isEmpty(details.paidCourses)) {
      isPaid = !!details.paidCourses.find(c => c.link.slice(1) === courseName)
    }
    const isAccessible = price === 0 || isPaid || details.isMember

    let episodeList
    if (content) {
      episodeList = content.map((item, i) => (
        <EpisodeItem
          key={i}
          header={item.header}
          section={item.section}
          courseName={courseName}
          isAccessible={isAccessible}
        />
      ))
    } else {
      episodeList = <Info>加载中</Info>
    }

    return (
      <Wrap>
        <TopHeader />

        <Container>
          <CourseName>{name}</CourseName>
          <VideoTitle>课程简介</VideoTitle>
          <VideoPlayer {...this.props.videoJsOptions} />

          <Section>
            <CourseMsgIntro title={'一句话简介'} intro={intro} />
            <CourseMsgIntro title={'适合观众'} intro={writingToWho} />
            <CourseMsgIntro title={'知识点'} intro={learningGoal} />
          </Section>

          <Section>{episodeList}</Section>

          {!this.props.isAuthenticated ? (
            <BuyCourseButton price={price} onClick={this.handleClick} />
          ) : !isAccessible ? (
            <BuyCourse
              name={name}
              price={price}
              courseId={_id}
              signContract={this.props.signContract}
              checkContract={this.props.checkContract}
            />
          ) : null}
        </Container>

        <Footer />
      </Wrap>
    )
  }
}

export default Course

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  padding: 0 16px;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`

const CourseName = styled.div`
  padding: 32px 0;
  color: #212121;
  text-align: center;
  font-size: 1.5em;
  @media (min-width: 768px) {
    padding: 48px 0;
    font-size: 2.5em;
  }
`

const VideoTitle = styled.div`
  padding: 8px;
  background-color: #00bcd4;
  color: #ffffff;
  font-size: 16px;
  @media (min-width: 768px) {
    padding: 12px;
    font-size: 20px;
  }
`

const Section = styled.div`
  width: 100%;
  max-width: 640px;
  margin: 48px auto;
  @media (min-width: 768px) {
    margin: 64px auto;
  }
`

const Info = styled.div`
  text-align: center;
  font-size: 2.5em;
`
