import React, { Component } from 'react'
import { Menu, Dropdown, Button, Icon } from 'antd'

class DropDownMenu extends Component {
  constructor () {
    super()
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }
  handleMenuClick (e) {
    if (this.props.buckets) {
      this.props.selected('bucket', 'buckets', e.key)
    } else if (this.props.regions) {
      this.props.selected('region', 'regions', e.key)
    }
  }
  render () {
    let menu = (
      <Menu onClick={this.handleMenuClick}>
        {
          this.props.buckets ? this.props.buckets.map((item, index) => <Menu.Item key={index}>{item.Name}</Menu.Item>)
          : null
        }
        {
          this.props.regions ? this.props.regions.map((item, index) => <Menu.Item key={index}>{item.name}</Menu.Item>)
          : null
        }
      </Menu>
    )
    return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ minWidth: '100px' }}>
            {this.props.bucket ? this.props.bucket.Name : this.props.region ? this.props.region.name : null} <Icon type='down' />
          </Button>
        </Dropdown>
      </div>
    )
  }
}
export default DropDownMenu
