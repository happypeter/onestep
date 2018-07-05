import React from 'react'

class Cart extends React.Component {
  render() {
    const { price, courseName, uid } = this.props
    return (
      <div>
        <div>{courseName}</div>
        <div>{uid}</div>
        <div>{price}</div>
      </div>
    )
  }
}

export default Cart
