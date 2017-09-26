import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'
import Home from '../Home/Home'
import Dashbord from '../Dashbord/Dashbord'

class Main extends Component {
  render () {
    return (
      <div className='main'>
        <Route exact path='/' component={Home} />
        <Route path='/dashbord' component={Dashbord} />
      </div>
    )
  }
}

export default Main
