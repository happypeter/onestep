import React from 'react'
import { Layout, Menu, Icon, Avatar } from 'antd'
import VideoLayout from './pages/video/VideoLayout'
import { Route } from 'react-router-dom'
const { Header, Sider, Content } = Layout

class SiderDemo extends React.Component {
  render () {
    return (
      <Layout>
        <Sider collapsed={true}>
          <div className='logo'>Logo</div>
          <Menu theme='dark' mode='inline' defaultSelectedKeys={[window.location.pathname]}>
            <Menu.Item key='1'>
              <Icon type='desktop' />
              <span>desktop</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='setting' />
              <span>setting</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='user' />
              <span>user</span>
            </Menu.Item>
            <Menu.Item key='4'>
              <Icon type='book' />
              <span>book</span>
            </Menu.Item>
            <Menu.Item key='5'>
              <Icon type='line-chart' />
              <span>line-chart</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: '50px' }}>
            <div className='header'>
              <div>
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                <i>用户名</i>
              </div>
              <div>
                <Icon type='question-circle-o' />
                <i>帮助</i>
              </div>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Route path='/' component={VideoLayout} />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default SiderDemo
