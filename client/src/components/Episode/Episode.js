import React, { Component } from 'react'
import TopHeader from '../../containers/TopHeaderContainer'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

const EpisodeWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background-color: #B2EBF2;
  text-align: center;
`
const VideoWrap = styled.div`
  border: 1px solid #BDBDBD;
  margin: 10%;
  padding: 150px 200px;
  background-color: #0097A7;
`
class Episode extends Component {
  render () {
    return (
      <div>
        <TopHeader />
        <EpisodeWrap>
          <VideoWrap>
            video: {this.props.episodeName}
          </VideoWrap>
        </EpisodeWrap>
        <Footer />
      </div>
    )
  }
}

export default Episode
