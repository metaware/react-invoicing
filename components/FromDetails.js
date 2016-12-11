import React from 'react';
import { Card, Input } from 'antd';

export class FromDetails extends React.Component {

  render() {
    return (
      <Card title="From">
        <Input placeholder="Metaware Labs Inc." style={{ marginBottom: '16px' }} />
        <Input type="textarea" rows={2} placeholder="1 Yonge St., Suite 1801, Toronto, On, M5E 1W7, Canada" />
      </Card>
    )
  }

}