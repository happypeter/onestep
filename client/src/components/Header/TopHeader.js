import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LoginHeaderSideButtons from './LoginHeaderSideButtons'
import LogoutHeaderSideButtons from './LogoutHeaderSideButtons'

const TopHeaderWrap = styled.div`
  background-color: #00BCD4;
  display: flex;
  justify-content: space-between;
`

const SideButtonsWrap = styled.div`
  display: flex;
  flex-direction: flex-end;
`

const Button = styled(Link)`
  font-size: 1em;
  padding: 0.5em;
  color: white;
  line-height: 2;
  opacity: 0.8;
  transition: all 0.5s ease;
  font-weight: 600;
  text-decoration: none;
  @media (min-width: 850px) {
    font-size: 1.2em;
    padding: 0.5em 1.3em;
  }
`

class TopHeader extends Component {
  render () {
    return (
      <TopHeaderWrap>
        <Button to='/'>
          首页
        </Button>
        <SideButtonsWrap>
          {
            this.props.sideButtons
            ? (
              <LogoutHeaderSideButtons
                username={this.props.sideButtons}
                logout={this.props.logout}
              />
            )
            : (
              <LoginHeaderSideButtons />
            )
          }
        </SideButtonsWrap>
      </TopHeaderWrap>
    )
  }
}

export default TopHeader
