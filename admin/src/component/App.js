import React, { Component } from 'react'
import { Layout, Menu, Icon,  Breadcrumb } from 'antd'
import SideBar from './sideBar'
import Test from './test'
// import Header from './header'
import './App.css'

const { Header, Footer, Sider, Content } = Layout
// import { Layout, Menu, Icon } from 'antd';

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
