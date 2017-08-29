import React, { Component } from 'react'
import { Input, Button } from 'antd'
import DropDownMenu from './DropDownMenu'
import axios from 'axios'
import jsonp from 'jsonp'

class Bucket extends Component {
  constructor () {
    super()
    this.state = {
      buckets: [],
      bucket: {},
      bucketname: '',
      regions: [
        {
          name: '华南',
          abbreviation: 'cn-south'
        },
        {
          name: '华北',
          abbreviation: 'cn-north'
        },
        {
          name: '华东',
          abbreviation: 'cn-east'
        },
        {
          name: '西南',
          abbreviation: 'cn-southwest'
        },
        {
          name: '新加坡',
          abbreviation: 'sg'
        }
      ],
      region: {
        name: '华南',
        abbreviation: 'cn-south'
      }
    }
    this.createBucket = this.createBucket.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selected = this.selected.bind(this)
  }
  componentWillMount () {
    // axios.get('http://localhost:6060/getservice')
    // .then(res => {
    //   this.setState({buckets: res.data.data.Buckets, bucket: res.data.data.Buckets[0]})
    // })
    axios.get('http://localhost:6060/')
    .then(res => {
      console.log(res)
      axios.get('http://haoqicat-1254205806.cos.cn-north.myqcloud.com/', {headers: {'Authorization': res.data.Authorization}})
      .then(a => console.log(a))
    })
  }
  handleChange (e) {
    this.setState({bucketname: e.target.value})
  }
  selected (name, container, index) {
    this.setState({[name]: this.state[container][index]})
  }
  createBucket () {
    let data = {
      Bucket: this.state.bucketname,
      Region: this.state.region.abbreviation
    }
    axios.post('http://localhost:6060/create/bucket', data)
    .then(res => console.log(res))
  }
  render () {
    return (
      <div>
        <div className='create-bucket'>
          <label>创建bucket:</label>
          <div>
            <Input placeholder='bucket名称' value={this.state.bucketname} onChange={this.handleChange} />
            <DropDownMenu regions={this.state.regions} region={this.state.region} selected={this.selected} />
            <Button type='primary' onClick={this.createBucket}>确认创建</Button>
          </div>
        </div>
        <div className='select-bucket clearfix'>
          <label>选择bucket:</label>
          <DropDownMenu buckets={this.state.buckets} bucket={this.state.bucket} selected={this.selected} />
        </div>
      </div>
    )
  }
}

export default Bucket
