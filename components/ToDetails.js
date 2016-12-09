import React from 'react';
import { Card, InputNumber } from 'antd';

const InvoiceNumber = ({ invoiceNumber, onInvoiceNumberChange }) => {
  return (
    <InputNumber size='small' min={1} defaultValue={invoiceNumber} onChange={onInvoiceNumberChange} />
  )
}

export class ToDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  invoiceNumber(number, onInvoiceNumberChange) {
    return (
      <div>
        Invoice Number: <InvoiceNumber number={number} onInvoiceNumberChange={onInvoiceNumberChange} />
      </div>
    )
  }

  render() {
    const { invoiceNumber, onInvoiceNumberChange } = this.props
    return (
      <Card title="To" loading extra={this.invoiceNumber(invoiceNumber, onInvoiceNumberChange)}>
      </Card>
    )
  }

}