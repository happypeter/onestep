import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import EpisodeCatalogue from './EpisodeCatalogue'
import CourseMsgIntro from '../common/CourseMsgIntro'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

class Course extends Component {

  pay = (price) => {
    this.props.pay(price)
  }

  render () {
    let {
      name,
      courseName,
      intro,
      writing_to_who: writingToWho,
      learning_goal: learningGoal,
      price,
      publishedAt,
      vlink,
      service,
      content
    } = this.props.courseOptions

    let episode
    if (content) {
      episode = content.map((item, i) => (
        <EpisodeCatalogue
          key={item.header}
          header={item.header}
          section={item.section}
          courseName={courseName}
        />
    ))
    } else {
      episode = (<Info>加载中</Info>)
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

        <MsgHero>
          <MsgWrap>
            <MsgArea>
              <CourseMsgIntro
                title={'一句话简介'}
                intro={intro}
              />
              <CourseMsgIntro
                title={'适合观众'}
                intro={writingToWho}
              />
              <CourseMsgIntro
                title={'知识点'}
                intro={learningGoal}
              />
            </MsgArea>
          </MsgWrap>
        </MsgHero>

        <CatalogueHero>
          <CatalogueWrap>
            { episode }
          </CatalogueWrap>
          <MsgBigCard>
              <Price>{price}元</Price>
            <RaisedButtonWrap
              raised
              onClick={() => this.pay(price)}
            >
                购买本课程
            </RaisedButtonWrap>
          </MsgBigCard>
        </CatalogueHero>

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
  background-color: #00BCD4;
  color: #FFFFFF;
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

const MsgHero = styled.div`
  background-color: #F7F7F7;
`

const MsgWrap = styled.div`
  flex-shrink: 0;
  @media (min-width: 1024px) {
    display: flex;
  }
`

const MsgArea = styled.div`
  margin-left: 2em;
  width: 100%;
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    margin: auto 28.5%;
    min-width: 600px;
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
    margin: 6.375em 23% 3em 23%;
  }
`

const Info = styled.div`
  margin: 0px auto;
  text-align: center;
  font-size: 2.5em;
`

const MsgBigCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 2em 2em 2em;
  padding-bottom: 1em;
  background-color: #FFFFFF;
  p {
    font-weight: 300;
    font-size: 0.875em;
    color: #212121;
  }
  @media (min-width: 1024px) {
    width: 247px;
    margin: 138px auto 131px auto;
    p {
      font-weight: 400;
    }
  }
`

const RaisedButtonWrap = styled(Button)`
  && {
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
    margin: 1em 16%;
    background-color: #00B4D0;
  }
`

const Price = styled.div`
  font-size: 30px;
  margin: 0 30px;
`
