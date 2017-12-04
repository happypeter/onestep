import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import ChapterIcon from '../../assets/ChapterIcon.svg'
import EpisodeIcon from '../../assets/EpisodeIcon.svg'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  ${'' /* max-width: 1350px;
  margin: 0 auto; */}

`

const VideoWrap = styled.div`

`

const VideoTitle = styled.div`
  height: 2.5em;
  line-height: 2.5em;
  max-width: 100%;
  background-color: #00BCD4;
  color: #FFFFFF;
  font-size: 1.25em;
  padding-left: 12px;
`

const Video = styled.div`
  margin: 0 23%;
`

const MsgWrap = styled.div`
  display: flex;
  background-color: #F7F7F7;
  flex-shrink: 0;
`

const MsgArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 23%;
  min-width: 600px;
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
`

const MsgBigCard = styled.div`
  width: 400px;
  max-height: 20.5em;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 44px;
  margin-bottom: 2em;
  padding-bottom: 1em;
  position: relative;
  left: -140px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  p {
    font-weight: 300;
    font-size: 0.875em;
    color: #212121;
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
    font-weight: 200;
    font-size: 1em;
    color: #FFFFFF;
  }
`

const Price = styled.div`
  font-size: 3em;
  margin: 10px 30px;
`

const MsgSmallCards = styled.div`
  display: flex;
`

const MsgSmallCard = styled.div`
  width: 15%;
  text-align: center;
  padding: 0.5em;
  margin-right: 20%;
  margin-bottom: 6em;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
`

const CardTitle = styled.span`
  font-size: 1em;
  color: #212121;
`

const CardContent = styled.p`
  font-size: 0.8em;
  line-height: 1.6em;
  opacity: 0.5;
  margin: 0.5em;
  text-align: left;
`

const CatalogueWrap = styled.div`
  margin: 6.375em 23% 3em 23%;
  border-top: 2.7em solid #00BCD4;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-decoration: none;
`

const CourseName = styled.div`
  margin: 44px auto;
  color: #573D00;
  text-align: center;
  font-size: 2.5em;
`

const Info = styled.div`
  margin: 0px auto;
  text-align: center;
  font-size: 2.5em;
`
const EpisodesWrap = styled.div`
  margin: 10px;
  padding: 5px 50px;
  text-decoration: none;
  text-align: left;
  color: #212121;
  border-radius: 40px;
`

const EpisodeChapter = styled.div`
  display: flex;
  color: #000000;
  margin-bottom: 10px;
  h1 {
    margin-left: 29px;
    font-size: 25px;
    font-weight: 300;
  }
`

const EpisodeLink = styled.div`
  display: flex;
  margin-left: 29px;
  margin-bottom: 18px;
`

const EpisodeTitle = styled(Link)`
  display: block;
  margin-left: 43px;
  text-decoration: none;
  color: #000000;
  font-size: 1em;
  font-weight: 300;
`

class Course extends Component {
  render () {
    let { name, intro, writing_to_who: writingToWho, learning_goal: learningGoal, price, publishedOn, vlink, service, content } = this.props.courseOptions

    let episode
    if (content) {
      episode = content.map((item, i) => (
        <EpisodesWrap to={'/'} key={item.header}>
          <EpisodeChapter>
            <img src={ChapterIcon} alt={'ChapterIcon'} />
            <h1>{item.header}</h1>
          </EpisodeChapter>
          {
            item.section.map(
              t => (
                <EpisodeLink>
                  <img src={EpisodeIcon} alt={'EpisodeIcon'} />
                  <EpisodeTitle to={`${this.props.courseName}/${t.link}`} key={t.link}>{t.title}</EpisodeTitle>
                </EpisodeLink>
              )
            )
          }
        </EpisodesWrap>
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
          <MsgBigCard>
            <PriceArea>
              <Price>{price}元</Price>
              <p>本课程</p>
            </PriceArea>
            <p>课程永久学习权限</p>
            <Splitter />
            <p>源代码</p>
            <RaisedButtonWrap raised>购买</RaisedButtonWrap>
          </MsgBigCard>
        </MsgWrap>

        <CatalogueWrap>
          { episode }
        </CatalogueWrap>

        <Footer />
      </Wrap>
    )
  }
}

export default Course
