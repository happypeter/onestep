import React, {Component} from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import EpisodeCatalogue from './EpisodeCatalogue'
import CourseMsgIntro from '../common/CourseMsgIntro'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import BuyCourse from './BuyCourse'

class Course extends Component {
  render() {
    let {
      name,
      courseName,
      intro,
      writing_to_who: writingToWho,
      learning_goal: learningGoal,
      price,
      content,
      _id,
    } = this.props.courseOptions

    let episode
    if (content) {
      episode = content.map((item, i) => (
        <EpisodeCatalogue
          key={i}
          header={item.header}
          section={item.section}
          courseName={courseName}
        />
      ))
    } else {
      episode = <Info>加载中</Info>
    }

    return (
      <Wrap>
        <TopHeader />

        <VideoWrap>
          <CourseName>{name}</CourseName>
          <Video>
            <VideoTitle>课程简介</VideoTitle>
            <VideoPlayer {...this.props.videoJsOptions} />
          </Video>
        </VideoWrap>

        <MsgWrap>
          <MsgArea>
            <CourseMsgIntro title={'一句话简介'} intro={intro} />
            <CourseMsgIntro title={'适合观众'} intro={writingToWho} />
            <CourseMsgIntro title={'知识点'} intro={learningGoal} />
          </MsgArea>
        </MsgWrap>

        <CatalogueHero>
          <CatalogueWrap>{episode}</CatalogueWrap>
        </CatalogueHero>

        {price > 0 ? (
          <BuyCourse
            name={name}
            price={price}
            courseId={_id}
            signContract={this.props.signContract}
            checkContract={this.props.checkContract}
          />
        ) : null}
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

const VideoWrap = styled.div`
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const CourseName = styled.div`
  margin: 2em auto;
  color: #212121;
  text-align: center;
  font-size: 1.5em;
  @media (min-width: 1024px) {
    margin: 44px auto;
    font-size: 2.5em;
  }
`

const VideoTitle = styled.div`
  height: 1.5em;
  line-height: 1.5em;
  max-width: 100%;
  background-color: #00bcd4;
  color: #ffffff;
  font-size: 0.5em;
  padding-left: 12px;
  @media (min-width: 1024px) {
    height: 2.5em;
    line-height: 2.5em;
    max-width: 100%;
    font-size: 1.25em;
    padding-left: 12px;
  }
`

const Video = styled.div`
  margin: 0 2em;
  @media (min-width: 1024px) {
    margin: 0 23%;
  }
`

const MsgWrap = styled.div`
  flex-shrink: 0;
  margin-top: 81px;
  @media (min-width: 1024px) {
    display: flex;
    margin: 81px auto 0 auto;
    width: 620px;
  }
`

const MsgArea = styled.div`
  margin-left: 2em;
  width: 100%;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`

const CatalogueHero = styled.div`
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 0 auto;
  }
`

const CatalogueWrap = styled.div`
  margin: 0 2em 3em 2em;
  text-decoration: none;
  @media (min-width: 1024px) {
    margin: 81px 23% 48px 23%;
  }
`

const Info = styled.div`
  margin: 0px auto;
  text-align: center;
  font-size: 2.5em;
`
