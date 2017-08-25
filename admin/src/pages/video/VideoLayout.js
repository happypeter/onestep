import React from 'react'
import UploadVideo from './UploadVideo'
import Bucket from './Bucket'
import './video.css'
import { Layout, Menu } from 'antd'
import { Link, Route } from 'react-router-dom'
const { Content, Sider } = Layout

class VideoLayout extends React.Component {
  render () {
    return (
      <Layout>
        <Layout>
          <Sider width={180} style={{ background: '#fff' }}>
            <Menu
              mode='inline'
              defaultSelectedKeys={[this.props.history.location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key='/'><Link to='/'>bucket</Link></Menu.Item>
              <Menu.Item key='2'>二级导航</Menu.Item>
              <Menu.Item key='3'>二级导航</Menu.Item>
              <Menu.Item key='/upvideo'><Link to='/upvideo'>上传视频</Link></Menu.Item>
              <Menu.Item key='5'>二级导航</Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route exact path='/' component={Bucket} />
              <Route path='/upvideo' component={UploadVideo} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default VideoLayout
