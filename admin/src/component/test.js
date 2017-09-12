import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon } from 'antd'
const { Header, Content, Footer } = Layout

class Test extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <Header style={{ background: '#fff', padding: 10, display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline'}}>
          <span>用户名</span>
          <Icon type="user" />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            Bill is a cat.
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
