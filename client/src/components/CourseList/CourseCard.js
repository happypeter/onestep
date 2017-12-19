import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default props => (
  <CourseCard to={`${props.link}`} key={props.key}>
    <span>{props.publishedAt && props.publishedAt.substr(0, 10)}</span>
    <img src={`${props.cover}`} alt='cover' className='cover' />
    <p>{props.title}</p>
  </CourseCard>
)

const CourseCard = styled(Link)`
  margin: 1em;
  width: 100%;
  flex-grow: 0;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  -webkit-transition: all 450ms ease;
  transition: all 450ms ease;
  text-align: left;
  text-decoration: none;
  color: rgb(76, 87, 101);

  img {
    width: 100%;
    display: block;
  }

  p {
    border-top: 1px solid rgb(226, 226, 226);
    margin: 0;
    padding: 15px;
    font-size: 17px;
  }

  span {
    font-size: 14px;
    padding:5px 0 5px 15px;
    display: inline-block;
    font-weight: 200;
  }

  @media (min-width: 600px) {
    width: calc(50% - 4em)
  }

  @media (min-width: 1024px) {
    width: calc(33.33333% - 2em)
  }
`
