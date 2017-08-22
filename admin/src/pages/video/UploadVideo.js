import React from 'react'
import { Upload, Icon, message, Input } from 'antd'
const Dragger = Upload.Dragger

const props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name}`);
    } else if (status === 'error') {
      message.error(`${info.file.name}`);
    }
  }
}

class UploadVideo extends React.Component{
  render(){
    return (
      <div>
        <div className='upload'>
          <div className='course-choice clearfix'>
            <span style={{ marginRight: '10px', float:'left' }}>课程名</span>
            <div style={{ float:'left' }}>
              <Input
                suffix={<Icon type="down" />}
                placeholder="搜索"
                style={{ width: '180px' }}
              />
              <div className='search-course'>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
                <p>测试</p>
              </div>
            </div>
          </div>
          <div style={{ height: 180, width: 400 }}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="cloud-upload-o" />
              </p>
              <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
              <p className="ant-upload-hint">支持扩展名.mp4</p>
            </Dragger>
          </div>
        </div>
      </div>
    )
  }
}
export default UploadVideo
