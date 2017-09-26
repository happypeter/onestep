import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'
import Home from '../Home/Home'

class Main extends Component {
  render() {
    return (
      <div className='main'>
        <Route exact='/' component={ Home } />
      </div>
    )
  }
}

export default Main
