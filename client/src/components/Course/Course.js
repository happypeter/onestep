import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import Button from 'material-ui/Button'
import EpisodeCatalogue from './EpisodeCatalogue'
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
              <MsgIntro>{intro}</MsgIntro>
              <MsgSmallCards>
                <MsgSmallCard>
                  <CardTitle>适合观众</CardTitle>
                  <CardContent>{writingToWho}</CardContent>
                </MsgSmallCard>
                <MsgSmallCard>
                  <CardTitle>知识点</CardTitle>
                  <CardContent>{learningGoal}</CardContent>
                </MsgSmallCard>
              </MsgSmallCards>
            </MsgArea>
          </MsgWrap>
        </MsgHero>

        <CatalogueHero>
          <CatalogueWrap>
            { episode }
          </CatalogueWrap>
          <MsgBigCard>
            <PriceArea>
              <Price>{price}元</Price>
              <p>本课程</p>
            </PriceArea>
            <p>课程永久学习权限</p>
            <Splitter />
            <p>源代码</p>
            <RaisedButtonWrap
              raised
              onClick={() => this.pay(price)}
            >
                购买
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

const MsgIntro = styled.div`
  color: #212121;
  margin: 0px auto;
  margin-top: 44px;
  margin-left: 0;
  margin-right: 10px;
  padding: 0.5em 1em;
  margin-bottom: 14px;
  font-size: 1em;
  border-left: 7px solid #00BCD4;
  @media (min-width: 1024px) {
    padding-right: 30px;
  }
`

const MsgSmallCards = styled.div`
  display: flex;
  padding: 30px 40px 55px;
`

const MsgSmallCard = styled.div`
  width: 35%;
  min-height: 215px;
  text-align: center;
  flex-shrink: 0;
  margin-bottom: 1.5em;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  @media (min-width: 1024px) {
    width: 187px;
    margin: 0 30px;
  }
`

const CardTitle = styled.div`
  box-sizing: border-box;
  height: 36px;
  padding: 10px;
  background-color: #00B4D0;
  font-size: 1em;
  line-height: 1em;
  color: #FFFFFF;
`

const CardContent = styled.p`
  font-size: 0.8em;
  line-height: 1.6em;
  margin: 0.5em;
  padding: 0.5em;
  text-align: left;
  color: #212121;
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
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
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

const Splitter = styled.div`
  flex-shrink: 0;
  height: 1px;
  margin: 0 16%;
  opacity: 0.48;
  background: #D8D8D8;
`

const RaisedButtonWrap = styled(Button)`
  && {
    margin: 1em 16%;
    color: white;
    background-color: #00B4D0;
  }
`

const PriceArea = styled.div`
  background-color: #00BCD4;
  height: 40%;
  padding: 1.75em;
  color: #FFFFFF;
  p {
    font-weight: 400;
    font-size: 1em;
    color: #FFFFFF;
  }
`

const Price = styled.div`
  font-size: 3em;
  margin: 10px 30px;
`
