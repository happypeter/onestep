import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import withWidth from '@material-ui/core/withWidth'

const styles = theme => ({
  root: {
    backgroundColor: '#00bcd4',
    height: 64,
    lineHeight: '64px',
    color: '#fff',
    textAlign: 'center'
  }
})

class Header extends Component {
  render() {
    const { classes: s } = this.props
    return <div className={s.root}>Haoqicat</div>
  }
}

export default compose(
  withStyles(styles),
  withWidth()
)(Header)
