import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import { Layout, Breadcrumb, Icon, Table, Upload,message ,Progress, Input} from 'antd'
import COS from 'cos-js-sdk-v5'
import TableColumns from './tableColumns'
const Dragger = Upload.Dragger;


//腾讯cos js-sdk配置
// 获取鉴权签名的回调函数
var getAuthorization = function (options, callback) {

    // // 方法一，将 COS 操作的 method 和 pathname 传递给服务端，由服务端计算签名返回（推荐）
    // var method = (options.method || 'get').toLowerCase();
    // var pathname = options.pathname || '/';
    //
    // // 将 method 和 pathname 参数传递给服务端，此处是举例
    // var url = '../server/auth.php?method=' + method + '&pathname=' + pathname;
    //
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.onload = function (e) {
    //   callback(e.target.responseText);
    // };
    // xhr.send();

    // 方法二，直接在前端利用 SecretId 和 SecretKey 计算签名，适合前端调试使用，不提倡在前端暴露 SecretId 和 SecretKey

    var authorization = COS.getAuthorization({
      SecretId: `${config.SecretId}`,
      SecretKey: `${config.SecretKey}`,
      method: (options.method || 'get').toLowerCase(),
      pathname: options.pathname || '/',
    });
    callback(authorization);

};

var params = {
  AppId: `${config.AppId}`,                            /* 必须 */
  getAuthorization: getAuthorization,                   /* 必须 */
  // FileParallelLimit: 'NUMBER',                          /* 非必须 */
  // ChunkParallelLimit: 'NUMBER',                         /* 非必须 */
  // ChunkSize: 'NUMBER',                                  /* 非必须 */
  // ProgressInterval: 'NUMBER',                           /* 非必须 */
  // Domain: 'STRING_VALUE',                               /* 非必须 */
};

var cos = new COS(params);
// js-sdk配置部分至此


const { Header, Content, Footer } = Layout

class Test extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      contents: [],
      percent: 0,
      name: '文件名',
      progress: [],
      folder: '',
      inputClass: ''
    }
  }

  componentWillMount () {
    axios.get(`${config.api}/bucket`)
    .then(
      res => {
        this.setState({
          contents: res.data.Contents
        })
        console.log(this.state.contents)
      }
    )
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.err)
      } else {
        console.log(err)
      }
    })

    // axios.post(`${config.api}/sliceUploadFile`)
    // .then(
    //   res => {
    //     console.log(res)
    //   }
    // )
    // .catch(err => {
    //   if (err.response) {
    //     console.log(err.response.data.err)
    //   } else {
    //     console.log(err)
    //   }
    // })
  }

  //指定的文件夹名
  onPressEnter (e) {
    console.log(e.target.value)
    let folderName = e.target.value.trim()
    let parseName = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/

    //分开判断，便于精确提示用户
    if (folderName.length > 20) {
      message.error('最多支持 20 个字符')
      this.setState({
        inputClass: 'has-feedback has-error'
      })
    } else if (!parseName.test(folderName)) {
      message.error('仅支持数字、中英文、下划线')
      this.setState({
        inputClass: 'has-feedback has-error'
      })
    } else {
      this.setState({
        folder: `${folderName}/`,
        inputClass: 'has-feedback has-success'
      })
      e.target.value = ''
      message.success(`文件将上传至${folderName}/`)
    }
  }

  render () {
    let that = this
    //antd拖拽组件部分
    const props = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      action: '', //无效的上传地址
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
          //就是要通过antd，拖拽后拿到File对象
          let file = info.file.originFileObj

          //为新拖拽的文件生成一个空的进度条
          let uploadObj = {
            percent: 0,
            name: info.file.originFileObj.name,
            status: 'normal'
          }
          let [ ...clonedProgress ] = that.state.progress

          clonedProgress.push(uploadObj)

          that.setState({
            progress: clonedProgress
          })

          //尝试在回调中引入cos-js-sdk 分块上传
          var params = {
            Bucket: `${config.Bucket}`,
            Region: `${config.Region}`,                      /* 必须 */
            Key: `${that.state.folder}${file.name}`,
            Body: file,                                     /* 必须 */
            // Body: 'File || Blob',
            // SliceSize: 'STRING_VALUE',                      /* 非必须 */
            // StorageClass: 'STRING_VALUE',                   /* 非必须 */
            // AsyncLimit: 'NUMBER',                           /* 非必须 */
            // TaskReady: function(taskId) {                   /* 非必须 */
            //   console.log(taskId);
            // },
            // onHashProgress: function (progressData) {       /* 非必须 */
            //   console.log(JSON.stringify(progressData));
            // },



            onProgress: function (progressData) {           /* 非必须 */
              console.log(JSON.stringify(progressData))
              //打印内容：
              // test.js:160 {"loaded":5947392,"total":11074706,"speed":5198769.23,"percent":0.53}

              //进度条信息
              let percent = progressData.percent*100

              //运用数组栈方法来更新进度信息
              let [ ...clonedTempProgress ] = that.state.progress

              let newUploadFileInfo = clonedTempProgress.pop()
              //更新进度
              newUploadFileInfo.percent = percent

              if (percent < 100) {
                newUploadFileInfo.status = 'active'
              } else if (percent === 100) {
                newUploadFileInfo.status = 'success'
              }

              clonedTempProgress.push(newUploadFileInfo)

              that.setState({
                progress: clonedTempProgress
              })
              // clonedProgress.push(progressObj)
              //
              // that.setState({
              //   progress: clonedProgress
              // })
              // console.log(that.state.progress)
            }
          };
          console.log(typeof file);
          console.log(info.file.originFileObj);
          console.log(info.file.originFileObj.name);

          cos.sliceUploadFile(params, function(err, data) {
            if(err) {
              console.log(err);
              //运用数组栈方法来使进度条显示上传出错
              let [ ...clonedTempProgress ] = that.state.progress
              let newUploadFileInfo = clonedTempProgress.pop()
              //更新进度
              newUploadFileInfo.status = 'exception'
              clonedTempProgress.push(newUploadFileInfo)

              that.setState({
                progress: clonedTempProgress
              })
            } else {
              //上传成功
              console.log(data);
              //data.Location: "testbucket-1252891333.ap-beijing.myqcloud.com/gg.jpg"
            }
          });
          //cos-js-sdk 分块上传 结束
        }
        // if (status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }

      },//onchange结束
    };

    return (
      <Layout style={{ minHeight: '100vh', width: '100%' }}>

        <Header style={{background: '#fff', padding: 10, display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline'}}>
          <span>用户名</span>
          <Icon type='user' />
        </Header>

        {/* 展示bucket内容 */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Demo</Breadcrumb.Item>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

            <Table columns={TableColumns}
            dataSource={this.state.contents}
            rowKey={item => item.LastModified}
            />

          </div>
        </Content>

        {/* 进度条 */}
        {
          this.state.progress.map(
            (item, index) => {
              return (
                <div key={index}>
                  <text>{item.name}</text>
                  <Progress percent={item.percent} status={item.status} />
                </div>
              )
            }
          )
        }

        {/*上传目标文件夹*/}
        <div className={"has-success"} style={{ marginTop: 16, height: 80 }}>
          <text>目标文件夹：{this.state.folder ? this.state.folder : 'bucket顶层'}</text>
          <Input placeholder="要传入的文件夹名称" onPressEnter={this.onPressEnter.bind(this)} />
          <div className="ant-form-explain">可用数字、中英文、下划线组合，最多20个字符</div>
        </div>

        {/* 拖拽块 */}
        <div style={{ marginTop: 16, height: 180 }}>

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
          </Dragger>
        </div>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default Test
// 已经获得了必要参数，Name和Key，传递给content组件就行了。后者组织成	testbucket-1252891333.file.myqcloud.com/vvv.jpg
