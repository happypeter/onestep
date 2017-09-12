import React, { Component } from 'react'
import SideBar from './sideBar'
import Test from './test'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SideBar />
        <Test />
      </div>
    )
  }
}

export default App
