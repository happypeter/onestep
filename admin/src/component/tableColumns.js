import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'


const TableColumns = [{
  title: '名称',
  dataIndex: 'Key',
  key: 'Key',
}, {
  title: '更新时间',
  dataIndex: 'LastModified',
  key: 'LastModified',
  render: (text) => {
    return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
  }
}, {
  title: '操作',
  dataIndex: 'ETag',
  key: 'ETag',
  render: (text) => {
    return <Link to={`/content/${text}`}>查看</Link>
  },
}]

export default TableColumns
