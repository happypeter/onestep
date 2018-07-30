import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

class BuyCourseButton extends Component {
  handleClick = () => {
    this.props.onClick()
  }

  render() {
    const { price } = this.props
    console.log('price', price)
    return (
      <Wrap>
        {price && <Price>{price}元</Price>}
        <Button variant="raised" color="secondary" onClick={this.handleClick}>
          {price === '0' ? '免费' : '购买课程'}
        </Button>
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
