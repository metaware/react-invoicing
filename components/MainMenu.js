import React from 'react';
import { Menu } from 'antd'

export class MainMenu extends React.Component {

  render() {
    return (
      <Menu theme='dark' mode='horizontal'>
        <Menu.Item>React Invoicing</Menu.Item>
      </Menu>
    )
  }

}