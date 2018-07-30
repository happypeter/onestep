import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    textAlign: 'center'
  },
  priceTag: {
    fontSize: `2em`,
    padding: theme.spacing.unit * 2
  }
})

class Buy extends React.Component {
  render() {
    const { classes: s, price, goto } = this.props
    const isFree = price === 0

    const buyButton = (
      <div>
        <div className={s.priceTag}>{price}元</div>
        <Button onClick={() => goto('/cart')} variant="raised" color="primary">
          购买
        </Button>
      </div>
    )

    const content = isFree ? '免费课程' : buyButton
    return <div className={s.root}>{content}</div>
  }
}

Buy.propTypes = {
  price: PropTypes.number.isRequired
}

export default withStyles(styles)(Buy)
