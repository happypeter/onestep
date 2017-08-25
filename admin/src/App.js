import React, { Component } from 'react'
import Layout from './Layout'
import { BrowserRouter } from 'react-router-dom'
import './root.css'
class App extends Component {
  render () {
    return (
      <div className='main'>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    )
  }
}

export default App
