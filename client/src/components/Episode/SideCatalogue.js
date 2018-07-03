import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import EpisodeIcon from '../../assets/EpisodeIcon.svg'

export default ({ section, courseName, episodeName }) => (
  <div>
    {section.map(t => (
      <EpisodeLink key={t.link} to={`/${courseName}/${t.link}`}>
        <img src={EpisodeIcon} alt="EpisodeIcon" />
        <EpisodeTitle active={`${t.link === episodeName}`}>
          {t.title}
        </EpisodeTitle>
      </EpisodeLink>
    ))}
  </div>
)

const EpisodeLink = styled(Link)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  cursor: pointer;
  text-decoration: none;
  img {
    flex-shrink: 0;
    width: 16px;
  }
  :hover {
    border-bottom: 1px solid #00bcd4;
  }
`

const EpisodeTitle = styled.div`
  margin-left: 16px;
  color: #333;
  font-size: 14px;
  word-break: break-word;
  padding: 16px 0;
  color: ${props => (props.active === 'true' ? '#00bcd4' : '#333')};
`
