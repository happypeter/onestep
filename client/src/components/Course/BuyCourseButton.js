import React, { Component } from 'react'
import styled from 'styled-components'
import Button from 'material-ui/Button'

class BuyCourseButton extends Component {
  handleClick = () => {
    this.props.onClick()
  }

  render() {
    return (
      <Wrap>
        <Price>{this.props.price}元</Price>
        <RaisedButton raised onClick={this.handleClick}>
          购买课程
        </RaisedButton>
      </Wrap>
    )
  }
}

export default BuyCourseButton

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px auto 56px;
  max-width: 240px;
  width: 100%;
`

const Price = styled.div`
  font-size: 32px;
  color: #212121;
  padding-bottom: 24px;
`

const RaisedButton = styled(Button)`
  && {
    width: 100%;
    font-size: 24px;
    color: #ffffff;
    background-color: #ff4081;
  }
`
