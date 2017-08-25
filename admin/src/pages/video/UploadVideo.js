import React from 'react'
import { Upload, Icon, Input, Progress } from 'antd'
const Dragger = Upload.Dragger

class UploadVideo extends React.Component {
  constructor () {
    super()
    this.state = {
      focus: false,
      courses: ['第一个', '第二个', '第三个', '第四个', '第五个', '第六个'],
      search: '',
      filter: [],
      fileList: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.search = this.search.bind(this)
  }
  handleChange (info) {
    let fileList = info.fileList
    this.setState({...this.state.fileList, fileList})
  }
  search (e) {
    this.setState({search: e.target.value}, () => {
      let filter = this.state.courses.filter(item => item.indexOf(this.state.search) !== -1)
      this.setState({filter})
    })
  }
  render () {
    let props = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      action: 'http://localhost:6060/postobject',
      onChange: this.handleChange
    }
    let courses = this.state.search && this.state.filter.length ? this.state.filter : this.state.courses
    return (
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <div className='upload-list'>
          {
            this.state.fileList.map(item => {
              return <div key={item.uid} className='clearfix'>
                <div>
                  <p>{item.name}</p>
                </div>
                <div>
                  <Progress percent={item.percent} status={item.percent === 100 ? 'success' : 'exception'} />
                </div>
                <div>
                  <p>
                    <span>删除</span> | <span>重命名</span>
                  </p>
                </div>
              </div>
            })
          }
        </div>
        <div className='upload'>
          <div className='course-choice clearfix'>
            <span style={{ marginRight: '10px', float: 'left', lineHeight: '28px' }}>课程名</span>
            <div style={{ float: 'left' }}>
              <Input
                suffix={this.state.focus ? <Icon type='up' /> : <Icon type='down' />}
                placeholder='搜索'
                style={{ width: '180px' }}
                value={this.state.search}
                onChange={this.search}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
              />
              <div className='search-course' style={{ display: this.state.focus ? 'block' : 'none' }}>
                {
                  courses.map(item => <p key={Math.random()}>{item}</p>)
                }
              </div>
            </div>
          </div>
          <div style={{ height: 180, width: 400 }}>
            <Dragger {...props}>
              <p className='ant-upload-drag-icon'>
                <Icon type='cloud-upload-o' />
              </p>
              <p className='ant-upload-text'>点击或将文件拖拽到这里上传</p>
              <p className='ant-upload-hint'>支持扩展名.mp4</p>
            </Dragger>
          </div>
        </div>
      </div>
    )
  }
}
export default UploadVideo
