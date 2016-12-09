import React from 'react';
import {
  Table,
  Card,
  Button,
  Icon, Input
} from 'antd'
import * as Immutable from 'immutable';
import NumberFormat from 'react-number-format';
import Pretty from './Pretty';
let numeral = require('numeral');

class EditableCell extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="editable-cell">
        <div className="editable-cell-input-wrapper">
          <Input
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            addonBefore={this.props.addonBefore}
          />
        </div>
      </div>
    )
  }
}

class LineItems extends React.Component {
  
  constructor(props) {
    super(props)
    this.columns = [{
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => this.renderColumns(text, record, index, 'description')
    }, { 
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (text, record, index) => this.renderColumns(text._input, record, index, 'quantity', '$')
    }, {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: 150,
      render: (text, record, index) => this.renderColumns(text._input, record, index, 'cost', '$')
    }, {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      fixed: 'right',
      width: 150,
      render: (text, record, index) => {
        return numeral(text).format('$0,0.00')
      }
    }];
  }

  onLineItemUpdate(record, property, addonBefore, event) {
    if (addonBefore) {
      record[property] = numeral(event.target.value)
    } else {
      record[property] = event.target.value;
    }
    this.props.onLineItemUpdate(record.cid, Immutable.Map(record))
  }

  renderColumns(text, record, index, key, addonBefore = '') {
    return <EditableCell 
      value={text} 
      onChange={this.onLineItemUpdate.bind(this, record, key, addonBefore)}
      record={record} 
      property={key}
      placeholder={'Add Item Description Here'}
      addonBefore={addonBefore}
      />
  }

  render() {
    this.items = this.props.items.toArray().map((lineItem) => lineItem.toObject() );
    this.onLineItemAdd = this.props.onLineItemAdd;
    return (
      <Table 
        dataSource={this.items}
        columns={this.columns}
        pagination={false} 
        showHeader={true} 
        size="middle"
        footer={() => <Button className="editable-add-btn" type="ghost" onClick={this.onLineItemAdd}>Add Line Item</Button> } 
      />
    )
  }

}

export default {
  LineItems,
  EditableCell
}