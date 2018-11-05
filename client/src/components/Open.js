import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: 340,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 32
  },
  button: { marginTop: 24 }
})

class Open extends Component {
  state = { uid: '', coin: '' }

  handleSubmit = () => {
    const { uid, coin } = this.state
    this.props.open({ uid, coin })
  }

  handleUidChange = e => {
    this.setState({ uid: e.target.value })
  }

  handleCoinChange = e => {
    this.setState({ coin: e.target.value })
  }

  render() {
    const { classes: s, isAdmin, history } = this.props
    const { uid, coin } = this.state
    if (!isAdmin) {
      history.push('/')
      return null
    }
    return (
      <Paper className={s.root}>
        <TextField
          style={{ width: '100%' }}
          onChange={this.handleUidChange}
          margin="dense"
          label="uid"
          value={uid}
        />
        <TextField
          style={{ width: '100%' }}
          onChange={this.handleCoinChange}
          margin="dense"
          label="coin"
          value={coin}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={this.handleSubmit}
          className={s.button}
        >
          提交
        </Button>
      </Paper>
    )
  }
}

export default withStyles(styles)(Open)
