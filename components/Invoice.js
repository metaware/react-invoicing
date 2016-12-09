import React from 'react';
import { 
  Row, 
  Col,
  Table,
  Card,
  Button
} from 'antd';
let numeral = require('numeral');

import NumberFormat from 'react-number-format';
import { EditableCell } from './LineItems';
import { FromDetails } from './FromDetails';
import ToDetailsContainer from '../containers/ToDetailsContainer';
import LineItemsContainer from '../containers/LineItemsContainer';

const firstRowStyle = {
  paddingTop: 30,
  paddingBottom: 30
}

export class Invoice extends React.Component {

  constructor(props) {
    super(props);
  }

  onUpdateTax(event) {
    this.props.onUpdateTax(event.target.value)
  }

  render() {
    const { state, total } = this.props
    const totalDataSource = [{
      name: 'Subtotal',
      key: 'subTotal',
      value: total.subTotal
    }, {
      name: 'Tax (%)',
      key: 'taxPercentage',
      value: state.taxPercentage.input()
    }, {
      name: 'Total Tax',
      key: 'totalTax',
      value: total.totalTax
    },{
      name: 'Grand Total',
      key: 'grandTotal',
      value: total.grandTotal
    }]

    const totalColumns = [{
      title: "Name",
      key: "name",
      dataIndex: "name"
    }, {
      title: "Value",
      key: "value",
      dataIndex: "value",
      fixed: "right",
      render: (text, record, index) => {
        if(index != 1) {
          return numeral(text).format("$0,0.00")
        } else {
          return (
            <EditableCell 
              value={text}
              onChange={this.onUpdateTax.bind(this)}
              record={record} 
              property="value"
            />
          )
        }
      },
      width: 150
    }]

    return (
      <div>
        <Row type="flex" justify="center" gutter={30}>
          <Col span={3}>
            <h1>INVOICE</h1>
          </Col>
        </Row>

        <Row gutter={30} type="flex" justify="center" style={firstRowStyle}>
          <Col span={8}>
            <ToDetailsContainer/>
          </Col>
          <Col span={8}>
            <FromDetails/>
          </Col>
        </Row>

        <Row gutter={30} type="flex" justify="center" >
          <Col span={16}>
            <Card bodyStyle={{ padding: 0 }}>
              <LineItemsContainer/>
            </Card>
          </Col>
        </Row>

        <Row gutter={30} type="flex" justify="center" style={firstRowStyle}>
          <Col span={8}>
          </Col>
          <Col span={8}>
            <Card bodyStyle={{ padding: 0 }}>
              <Table dataSource={totalDataSource} columns={totalColumns} pagination={false} showHeader={false} size="middle" />
            </Card>
          </Col>
        </Row>

        <Row type='flex' justify='center'>
          <Col span={10}>
            <p>Jasdeep Singh & Manpreet Singh Made with ♥ in Toronto by Metaware Labs Inc.</p>
          </Col>
        </Row>
      </div>
    )
  }

}