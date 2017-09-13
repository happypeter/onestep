import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Layout, Breadcrumb, Icon } from 'antd'

const { Header, Content, Footer } = Layout

class Test extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: [],
      test: 'TEST'
    }
  }

  componentWillMount () {
    axios.get(`${config.api}/bucket`)
    .then(
      res => {
        this.setState({
          value: res.data.Contents
        })
        console.log(this.state.value)
      }
    )
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.err)
      } else {
        console.log(err)
      }
    })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <Header style={{background: '#fff', padding: 10, display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline'}}>
          <span>用户名</span>
          <Icon type='user' />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Demo</Breadcrumb.Item>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            value: {this.state.test}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default Test
