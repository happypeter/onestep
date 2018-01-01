import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ChapterIcon from '../../assets/ChapterIcon.svg'
import EpisodeIcon from '../../assets/EpisodeIcon.svg'

export default ({ header, section, courseName }) => (
  <EpisodesWrap>
    <EpisodeChapter>
      <img src={ChapterIcon} alt={'ChapterIcon'} />
      <h1>{header}</h1>
    </EpisodeChapter>
    {
      section.map(
        t => (
          <EpisodeLink key={t.link} to={`/${courseName}/${t.link}`}>
            <img src={EpisodeIcon} alt={'EpisodeIcon'} />
            <EpisodeTitle>{t.title}</EpisodeTitle>
          </EpisodeLink>
        )
      )
    }
  </EpisodesWrap>
)

const EpisodesWrap = styled.div`
  margin: 10px;
  padding: 5px;
  text-decoration: none;
  text-align: left;
  color: #212121;
  border-radius: 40px;
  @media (min-width: 1024px) {
    padding: 5px 50px;
  }
`

const EpisodeChapter = styled.div`
  display: flex;
  color: #000000;
  margin-bottom: 10px;
  h1 {
    margin-left: 10px;
    font-size: 1.2em;
  }
  img {
    width: 25px;
  }
  @media (min-width: 1024px) {
    h1 {
      margin-left: 25px;
      font-size: 23px;
      font-weight: 400;
    }
  }
`

const EpisodeLink = styled(Link)`
  display: flex;
  margin-left: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #D8D8D8;
  cursor: pointer;
  text-decoration: none;
  img {
    width: 19px;
  }
  @media (min-width: 1024px) {
    margin-left: 22px;
    font-weight: 400;
  }
`

const EpisodeTitle = styled.div`
  display: block;
  margin-left: 15px;
  color: #000000;
  font-size: 1em;
  @media (min-width: 1024px) {
    margin: 12px auto;
    margin-left: 30px;
    font-size: 1em;
  }
`
