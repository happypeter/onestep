import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import EpisodeIcon from '../../assets/EpisodeIcon.svg'

export default ({header, section, courseName}) => (
  <div>
    {section.map(t => (
      <EpisodeLink key={t.link} to={`/${courseName}/${t.link}`}>
        <img src={EpisodeIcon} alt={'EpisodeIcon'} />
        <EpisodeTitle>{t.title}</EpisodeTitle>
      </EpisodeLink>
    ))}
  </div>
)

const EpisodeLink = styled(Link)`
  display: flex;
  margin-left: 20px;
  border-bottom: 1px solid #D8D8D8;
  cursor: pointer;
  text-decoration: none;
  img {
    flex-shrink: 0;
    width: 16px;
  }
  :hover {
    border-bottom: 1px solid #00bcd4;
  }
  @media (min-width: 1024px) {
    font-size: 1em;
    img {
      width: 16px;
    }
  }
`

const EpisodeTitle = styled.div`
  display: block;
  margin-left: 15px;
  color: #000000;
  font-size: 1em;
  word-break: break-word;
  @media (min-width: 1024px) {
    margin: 10px auto;
    margin-left: 24px;
    margin-right: 10px;
    font-size: 1em;
  }
`
