import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ChapterIcon from '../../assets/ChapterIcon.svg'

export default ({ header, section, courseName, isAccessible }) => (
  <EpisodesWrap>
    <EpisodeChapter>
      <img src={ChapterIcon} alt={'ChapterIcon'} />
      <h1>{header ? header : '课程目录'}</h1>
    </EpisodeChapter>
    {section.map((t, index) => {
      if (isAccessible) {
        return (
          <EpisodeLink key={index} to={`/${courseName}/${t.link}`}>
            <EpisodeTitle>{t.title}</EpisodeTitle>
          </EpisodeLink>
        )
      }
      return (
        <EpNoLink key={index}>
          <EpisodeTitle>{t.title}</EpisodeTitle>
        </EpNoLink>
      )
    })}
  </EpisodesWrap>
)

const EpisodesWrap = styled.div`
  margin-bottom: 24px;
`

const EpisodeChapter = styled.div`
  display: flex;
  color: #212121;
  h1 {
    margin-left: 16px;
    font-size: 20px;
  }
  img {
    width: 24px;
  }
  @media (min-width: 768px) {
    h1 {
      margin-left: 24px;
      font-size: 24px;
    }
  }
`

const EpisodeLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin-left: 16px;
  border-bottom: 1px solid #d8d8d8;
  cursor: pointer;
  text-decoration: none;
  :hover {
    border-bottom: 1px solid #00bcd4;
  }
`

const EpNoLink = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin-left: 16px;
  border-bottom: 1px solid #d8d8d8;
`

const EpisodeTitle = styled.div`
  margin-left: 24px;
  color: #333;
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`
