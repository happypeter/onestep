import React from 'react'
import UploadVideo from './UploadVideo'
import './video.css'
import { Layout, Menu, } from 'antd'
const { Content, Sider } = Layout

class VideoLayout extends React.Component{
  render(){
    return (
      <Layout>
        <Layout>
          <Sider width={180} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[this.props.history.location.pathname]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">二级导航</Menu.Item>
              <Menu.Item key="2">二级导航</Menu.Item>
              <Menu.Item key="3">二级导航</Menu.Item>
              <Menu.Item key="/">上传视频</Menu.Item>
              <Menu.Item key="5">二级导航</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <UploadVideo />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default VideoLayout
