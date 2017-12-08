import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import ReactMarkdown from 'react-markdown'

const VideoWrap = styled.div`
  @media (min-width: 1024px) {
    box-sizing: border-box;
    width: 1024px;
    margin: 3.5em auto;
  }
`

// const CourseName = styled.div`
//   margin: 44px auto;
//   color: #573D00;
//   text-align: center;
//   font-size: 2.5em;
// `

const VideoTitle = styled.div`
  height: 1.5em;
  line-height: 1.5em;
  max-width: 100%;
  background-color: #00BCD4;
  color: #FFFFFF;
  font-size: 1em;
  padding-left: 12px;
  @media (min-width: 1024px) {
    height: 2.5em;
    line-height: 2.5em;
    font-size: 1.25em;
  }
`

const Video = styled.div`
  margin: 0 2em;
  @media (min-width: 1024px) {
    margin: 0 23%;
  }
`

const Doc = styled.div`
  ${'' /* width: 100%; */}
  margin:  2em;
  padding: 1em;
  padding-top: 0;
  border-top: 2em solid #00BCD4;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-decoration: none;
  color: #606060;
  font-weight: 400;
  line-height: 1.95;
  h1 {
    text-align: center;;
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
    width: 870px;
    margin: 3.5em auto;
    padding: 2.5em;
    border-top: 2.7em solid #00BCD4;
  }
`

class Episode extends Component {
  render () {
    let {
      videoJsOptions,
      episodeState: { doc, title }
    } = this.props
    return (
      <div>
        <TopHeader />

        <VideoWrap>
          {/* <CourseName></CourseName> */}
          <Video>
            <VideoTitle>{title}</VideoTitle>
            <VideoPlayer {...videoJsOptions} />
          </Video>
        </VideoWrap>

        <Doc>
          <ReactMarkdown source={doc} />
        </Doc>

        <Footer />
      </div>
    )
  }
}

export default Episode
