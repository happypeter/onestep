import React from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import SideCatalogue from './SideCatalogue'
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export default ({videoJsOptions, episodeState: {doc, title, courseCatalogue, name}, courseName}) => (
  <div>
    <TopHeader />

    <ContentWrap>
      <LeftWrap>
        <CourseName to={`/${courseName}`}>{name}</CourseName>
        {
          courseCatalogue
          ? courseCatalogue.map((item, i) => (
            <SideCatalogue
              key={item.header}
              header={item.header}
              section={item.section}
              courseName={courseName}
            />
          ))
          : null
        }
      </LeftWrap>

      <RightWrap>
        <Video>
          <VideoTitle>{title}</VideoTitle>
          <VideoPlayer {...videoJsOptions} />
        </Video>

        <Doc>
          <ReactMarkdown source={doc} />
        </Doc>
      </RightWrap>
    </ContentWrap>

    <Footer />
  </div>
)

const ContentWrap = styled.div`
  display: flex;
  @media (min-width: 1024px) {
    width: 1024px;
    margin: 0 auto;
    justify-content: space-between;
  }
`

const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    width: 204px;
    margin-left: 5em;
    padding-top: 3.5em;
  }
`

const CourseName = styled(Link)`
  margin: 0 auto;
  font-size: 1em;
  color: #00bcd4;
  text-decoration: none;
`

const RightWrap = styled.div`
  @media (min-width: 1024px) {
    width: 670px;
    margin-right: 5em;
  }
`

const Video = styled.div`
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 100%;
    margin: 3.5em auto;
  }
`

const VideoTitle = styled.div`
  height: 1.5em;
  line-height: 1.5em;
  max-width: 100%;
  background-color: #00bcd4;
  color: #ffffff;
  font-size: 1em;
  padding-left: 12px;
  @media (min-width: 1024px) {
    height: 2.5em;
    line-height: 2.5em;
    font-size: 1.25em;
  }
`

const Doc = styled.div`
  margin: 2em;
  padding: 1em;
  padding-top: 0;
  border-top: 2em solid #00bcd4;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-decoration: none;
  color: #606060;
  font-weight: 400;
  line-height: 1.95;
  h1 {
    text-align: center;
  }
  pre {
    padding: 16px;
    overflow: auto;
    font-size: 90%;
    line-height: 1.8;
    background-color: #f6f8fa;
    border-radius: 3px;
  }
  code {
    display: inline;
    max-width: auto;
    margin-bottom: 10px;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }
  a {
    color: #0366d6;
    text-decoration: none;
  }
  img {
    width: 100%;
    padding: 5px;
  }
  @media (min-width: 1024px) {
    width: 590px;
    margin: 3.5em auto;
    padding: 2.5em;
    border-top: 2.7em solid #00bcd4;
  }
`
