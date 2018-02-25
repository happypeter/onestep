import React, { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

class EpisodeDoc extends Component {
  render() {
    return (
      <Wrap>
        <ReactMarkdown source={this.props.doc} />
      </Wrap>
    )
  }
}

export default EpisodeDoc

const Wrap = styled.div`
  width: 100%;
  padding: 16px;
  margin: 32px 0;
  border-top: 32px solid #00bcd4;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  transition: all 450ms ease;
  color: #606060;
  line-height: 1.8;
  h1 {
    font-size: 24px;
    text-align: center;
  }
  pre {
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 16px;
    overflow: auto;
    font-size: 14px;
    line-height: 1.8;
    background-color: #f6f8fa;
  }
  a {
    color: #00bcd4;
    text-decoration: none;
  }
  img {
    display: block;
    width: 100%;
    padding: 16px;
  }
`
