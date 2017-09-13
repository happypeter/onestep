import React from 'react'
import moment from 'moment'


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
}]

export default TableColumns
