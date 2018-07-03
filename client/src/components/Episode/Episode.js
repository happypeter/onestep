import React from 'react'
import Footer from '../Footer/Footer'
import styled from 'styled-components'
import VideoPlayer from '../../lib/videoPlayer/VideoPlayer'
import EpisodeDoc from './EpisodeDoc'
import PropTypes from 'prop-types'

const Episode = ({
  videoJsOptions,
  episodeItem: { markdown, uid, courseUid },
  courseName
}) => (
  <div>
    <Container>
      <RightWrap>
        <div>
          <VideoTitle>{uid}</VideoTitle>
          <VideoPlayer {...videoJsOptions} />
        </div>

        <EpisodeDoc doc={markdown} />
      </RightWrap>
    </Container>

    <Footer />
  </div>
)

Episode.propTypes = {
  episodeItem: PropTypes.object.isRequired
}

export default Episode
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  padding: 0 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const RightWrap = styled.div`
  @media (min-width: 768px) {
    margin-left: 32px;
    width: calc(100% - 262px);
  }
`

const VideoTitle = styled.div`
  padding: 8px 16px;
  background-color: #00bcd4;
  color: #ffffff;
  font-size: 14px;
`
